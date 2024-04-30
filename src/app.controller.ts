import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PinoLoggerService } from './logger/logger.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: PinoLoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('Hello world');
    return this.appService.getHello();
  }
}
