const { DiagConsoleLogger, DiagLogLevel, diag } = require('@opentelemetry/api');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { NodeSDK, api } = require('@opentelemetry/sdk-node');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const {
  B3Propagator,
  B3InjectEncoding,
} = require('@opentelemetry/propagator-b3');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { NodeAutoInstrumentationsDefaultConfig } = require('./config.cjs');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const traceExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  serviceName: 'opentelemetry-example-nestjs',
});

api.propagation.setGlobalPropagator(
  new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
);

const sdk = new NodeSDK({
  serviceName: 'opentelemetry-example-nestjs',
  traceExporter,
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  // this is required to be null if registering a global propagator
  // it is unclear why
  textMapPropagator: null, 
  autoDetectResources: true,
  // instrumentations: [...getNodeAutoInstrumentations()],
  instrumentations: getNodeAutoInstrumentations(NodeAutoInstrumentationsDefaultConfig),
});

sdk.start();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
