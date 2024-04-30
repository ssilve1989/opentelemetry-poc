#!/usr/bin/env zsh

# Default number of requests
DEFAULT_REQUESTS=200

# Default number of concurrent requests
DEFAULT_CONCURRENCY=20

# Default endpoint
DEFAULT_ENDPOINT=""

# Number of requests
REQUESTS=${1:-$DEFAULT_REQUESTS}

# Number of concurrent requests
CONCURRENCY=${2:-$DEFAULT_CONCURRENCY}

# Endpoint to hit
ENDPOINT=${3:-$DEFAULT_ENDPOINT}

# Run the load test
pnpx autocannon -c ${CONCURRENCY} -a ${REQUESTS} http://localhost:8080/${ENDPOINT}
