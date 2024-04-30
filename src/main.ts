import { ReflectionService } from '@grpc/reflection';
import { LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import path from 'node:path';
import { AppModule } from './app.module.js';
import { PinoLoggerService } from './logger/logger.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = await app.resolve<LoggerService>(PinoLoggerService);

  app.useLogger(logger);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'echo',
      protoPath: path.resolve('proto', 'echo_service.proto'),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(8080);
}
bootstrap();
