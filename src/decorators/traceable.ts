import { SpanKind } from '@opentelemetry/api';
import { wrap } from '../telemetry/tracer';

export const Traceable = (): ClassDecorator => (target) => {
  for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      propertyName,
    );

    const shouldWrap =
      descriptor &&
      descriptor.value instanceof Function &&
      propertyName !== 'constructor';

    if (shouldWrap) {
      const originalMethod = descriptor.value;
      const className = target.name;
      const spanName = `${className}.${propertyName}`;

      descriptor.value = wrap(spanName, {
        kind: SpanKind.INTERNAL,
        originalMethod,
      });

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  }
};
