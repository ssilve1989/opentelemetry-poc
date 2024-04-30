#!/usr/bin/env zsh

# Default number of requests
DEFAULT_REQUESTS=200

# Default number of concurrent requests
DEFAULT_CONCURRENCY=20

# Number of requests
REQUESTS=${1:-$DEFAULT_REQUESTS}

# Number of concurrent requests
CONCURRENCY=${2:-$DEFAULT_CONCURRENCY}

# gRPC method to call
SERVICE_METHOD="echo.EchoService.Echo"

# gRPC server address
ADDRESS="localhost:5000"

# Run the load test
ghz --insecure \
  --proto=./proto/echo_service.proto \
  --call=${SERVICE_METHOD} \
  -d '{"message":"Hello"}' \
  -n ${REQUESTS} \
  -c ${CONCURRENCY} \
  ${ADDRESS}
