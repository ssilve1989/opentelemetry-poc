import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { InjectLogger } from './logger.consts.js';
import { Logger } from 'pino';
import { context, trace } from '@opentelemetry/api';

@Injectable({ scope: Scope.TRANSIENT })
class PinoLoggerService implements LoggerService {
  #context: string | undefined;

  constructor(@InjectLogger() private readonly logger: Logger) {}

  setContext(context: string): void {
    this.#context = context;
  }

  debug(message: any, context?: string | undefined): void {
    this.logger.debug(this.#getContext(context), message);
  }

  trace(message: any, context?: string | undefined): void {
    this.logger.trace(this.#getContext(context), message);
  }

  log(message: string, ...rest: any[]): void {
    // TODO: Generalize trace attachment
    const currentSpan = trace.getSpan(context.active());

    if (currentSpan) {
      const spanContext = currentSpan.spanContext();
      currentSpan.addEvent(message);
      this.logger.info({ msg: message, traceId: spanContext.traceId });
    } else {
      this.logger.info(message);
    }
  }

  fatal(message: string, context?: string): void {
    this.logger.fatal(this.#getContext(context), message);
  }

  info(message: string, context?: string): void {
    this.logger.info(this.#getContext(context), message);
  }

  warn(message: any, context?: string | undefined): void {
    this.logger.warn(this.#getContext(context), message);
  }

  error(err: Error, message?: string): void {
    this.logger.error(err, message);
  }

  #getContext(context?: string) {
    return context ?? this.#context;
  }
}

export { PinoLoggerService };
