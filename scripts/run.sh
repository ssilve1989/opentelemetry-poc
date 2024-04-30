#!/bin/bash


# This doesn't seem to provide as detailed info as the registration through the app does

OTEL_TRACES_EXPORTER="zipkin" \
OTEL_EXPORTER_ZIPKIN_ENDPOINT="http://localhost:9411/api/v2/spans" \
OTEL_NODE_ENABLED_INSTRUMENTATIONS="http,grpc,redis-4,pino" \
OTEL_EXPORTER_OTLP_COMPRESSION="gzip" \
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="http://localhost:9411/api/v2/spans" \
OTEL_EXPORTER_OTLP_HEADERS="x-api-key=your-api-key" \
OTEL_EXPORTER_OTLP_TRACES_HEADERS="x-api-key=your-api-key" \
OTEL_RESOURCE_ATTRIBUTES="service.namespace=my-namespace" \
OTEL_NODE_RESOURCE_DETECTORS="env,host,os" \
OTEL_SERVICE_NAME="opentelemetry-example-nestjs" \
NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" \
node dist/main.js
