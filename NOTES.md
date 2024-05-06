# Known Issues

## Private Class Members

These are not enumerated and therefore not instrumented

## ESM Compatibility

- https://github.com/open-telemetry/opentelemetry-js/issues/4437
- https://gajus.com/blog/how-to-add-sentry-tracing-to-your-node-js-app#nodejs-esm-modules
- https://www.npmjs.com/package/import-in-the-middle

```typescript
node --loader=import-in-the-middle/hook.mjs
```

## Auto Detect Resources

Figure out what this actually does? Whats the perf impact of letting it auto-detect.

> [!INFO]
> If you set your resource attributes via environment variable and code, the values set via the environment variable take precedence.
