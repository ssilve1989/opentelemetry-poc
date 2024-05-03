import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PinoLoggerService } from './logger/logger.service.js';
import client from 'prom-client';
import { SampleGuard } from './sample/sample.guard.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: PinoLoggerService,
  ) {}

  @Get()
  @UseGuards(SampleGuard)
  getHello(): string {
    this.logger.log('Hello world');
    return this.appService.getHello();
  }

  @Get('/metrics')
  @UseGuards(SampleGuard)
  getMetrics() {
    return client.register.metrics();
  }

  @Get('foo')
  @UseGuards(SampleGuard)
  foo() {}

  @Get('bar')
  @UseGuards(SampleGuard)
  bar() {}
}
