import { SpanKind } from '@opentelemetry/api';
import { api } from '@opentelemetry/sdk-node';
import { isPromise } from 'node:util/types';
import { Observable, catchError, finalize, from, isObservable, of } from 'rxjs';

type WrapOptions = {
  kind: SpanKind;
  originalMethod: (...args: any) => any;
};

function transformToObservable(result: unknown): Observable<any> {
  if (isPromise(result)) {
    return from(result);
  }
  if (isObservable(result)) {
    return result;
  }
  return of(result);
}

export function wrap(spanName: string, { kind, originalMethod }: WrapOptions) {
  return function (this: any, ...args: any[]) {
    const tracer = api.trace.getTracer('nestjs');

    return tracer.startActiveSpan(spanName, { kind }, (span) => {
      let result: undefined | any;

      try {
        result = originalMethod.apply(this, args);
      } catch (e: unknown) {
        if (typeof e === 'string' || e instanceof Error) {
          span.recordException(e);
        }
      }

      if (result) {
        const result$ = transformToObservable(result);
        return result$.pipe(
          catchError((error) => {
            span.recordException(error);
            throw error;
          }),
          finalize(() => span.end()),
        );
      }

      span.end();
    });
  };
}
