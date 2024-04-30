import { InstrumentationConfigMap } from '@opentelemetry/auto-instrumentations-node';

export const NodeAutoInstrumentationsDefaultConfig: InstrumentationConfigMap = {
  '@opentelemetry/instrumentation-grpc': {
    enabled: true,
  },

  '@opentelemetry/instrumentation-redis': {
    enabled: false,
  },

  '@opentelemetry/instrumentation-redis-4': {
    enabled: true,
  },

  '@opentelemetry/instrumentation-pino': {
    enabled: true,
  },

  '@opentelemetry/instrumentation-fs': {
    requireParentSpan: true,
    enabled: true,
    createHook: (_, { args }) => {
      // @ts-expect-error
      return !args[0].toString().indexOf('node_modules');
    },
    endHook: (_, { args, span }) => {
      // @ts-expect-error
      span.setAttribute('file', args[0].toString());
    },
  },

  '@opentelemetry/instrumentation-http': {
    requireParentforOutgoingSpans: true,
    requestHook: (span, request) => {
      // @ts-expect-error
      span.updateName(`${request.method} ${request.url}`);
    },
    enabled: true,
    ignoreIncomingRequestHook: (request) => {
      return (
        !!request.url &&
        ([
          '/_health',
          '/health',
          '/health/alive',
          '/health/ready',
          '/healthz',
          '/metrics',
          'healthcheck',
        ].includes(request.url) ||
          request.method === 'OPTIONS')
      );
    },
  },

  '@opentelemetry/instrumentation-graphql': {
    enabled: false,
  },
  // '@opentelemetry/instrumentation-net': {
  //   enabled: false,
  // },
  '@opentelemetry/instrumentation-nestjs-core': {
    enabled: false,
  },

  '@opentelemetry/instrumentation-dns': {
    enabled: false,
  },

  '@opentelemetry/instrumentation-express': {
    enabled: false,
  },
};
