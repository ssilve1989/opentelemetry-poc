import { Tracing } from '@amplication/opentelemetry-nestjs';
import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { api } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import express from 'express';
import { NodeAutoInstrumentationsDefaultConfig } from './instrumentation.config.js';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// explicit tracing setup. Doesn't work as well as doing the `--require` with a CJS module but here for backup
const server = express();
const metricReader = new PrometheusExporter({ preventServerStart: true });
const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  serviceName: 'opentelemetry-example-nestjs',
});

api.propagation.setGlobalPropagator(
  new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
);

Tracing.init({
  serviceName: 'opentelemetry-example-nestjs',
  metricReader,
  traceExporter: zipkinExporter,
  spanProcessors: [new BatchSpanProcessor(zipkinExporter)],
  autoDetectResources: true,
  instrumentations: [
    ...getNodeAutoInstrumentations(NodeAutoInstrumentationsDefaultConfig),
  ],
});

// TODO: custom metrics need to be served alongside w/e this collector is doing
server.get('/metrics', (req, res) =>
  metricReader.getMetricsRequestHandler(req, res),
);

export { server };
