import { Module } from '@nestjs/common';
import { PinoLoggerService } from './logger.service.js';
import { getLoggerToken } from './logger.consts.js';
import { createLogger } from './logger.js';

@Module({
  providers: [
    PinoLoggerService,
    {
      provide: getLoggerToken(),
      useValue: createLogger(),
    },
  ],
  exports: [PinoLoggerService],
})
export class LoggerModule {}
