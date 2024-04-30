import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from '@amplication/opentelemetry-nestjs';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthModule } from './health/health.module.js';
import { EchoModule } from './echo/echo.module.js';
import { RedisModule } from './redis/redis.module.js';
import { DbModule } from './db/db.module.js';
import { RatingsModule } from './ratings/ratings.module.js';
import { LoggerModule } from './logger/logger.module.js';

@Module({
  imports: [
    DbModule,
    EchoModule,
    HealthModule,
    RedisModule,
    LoggerModule,
    OpenTelemetryModule.forRoot(),
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
