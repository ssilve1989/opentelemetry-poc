import { SpanKind } from '@opentelemetry/api';
import { wrap } from '../telemetry/tracer';

export const Span =
  (): MethodDecorator =>
  (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;
    const spanName = `${className}.${propertyKey.toString()}`;

    descriptor.value = wrap(spanName, {
      kind: SpanKind.INTERNAL,
      originalMethod,
    });
  };
