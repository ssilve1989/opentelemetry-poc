import { ReflectionService } from '@grpc/reflection';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import path from 'node:path';
import { AppModule } from './app.module.js';
import { PinoLoggerService } from './logger/logger.service.js';
import prom from 'prom-client';
import { pinoHttp } from 'pino-http';

prom.collectDefaultMetrics();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = await app.resolve<PinoLoggerService>(PinoLoggerService);

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

  const server = app.getHttpAdapter();
  // biome-ignore lint/complexity/useLiteralKeys: <wanna reuse the logger instance easily and im fuggin lazy>
  server.use(pinoHttp({ logger: logger['logger'] }));

  await app.startAllMicroservices();
  await app.listen(8080);
}
bootstrap();
