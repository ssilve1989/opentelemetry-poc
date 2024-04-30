import { pino } from 'pino';

export function createLogger() {
  const { NODE_ENV, LOG_LEVEL = 'info' } = process.env;

  if (NODE_ENV === 'production') {
    return pino({
      level: LOG_LEVEL,
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
      messageKey: 'message',
      timestamp: () => `,"@timestamp":${new Date().toISOString()}`,
    });
  }

  return pino({
    level: LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
      },
    },
  });
}
