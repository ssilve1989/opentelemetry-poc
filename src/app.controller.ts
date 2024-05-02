import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PinoLoggerService } from './logger/logger.service.js';
import client from 'prom-client';

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

  @Get('/metrics')
  getMetrics() {
    return client.register.metrics();
  }
}
