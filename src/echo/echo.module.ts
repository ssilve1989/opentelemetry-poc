import { Module } from '@nestjs/common';
import { EchoController } from './echo.controller.js';
import { EchoService } from './echo.service.js';

@Module({
  controllers: [EchoController],
  providers: [EchoService],
})
export class EchoModule {}
