import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import {
  EchoRequest,
  EchoResponse,
  EchoServiceController,
  EchoStreamRequest,
} from './echo.interfaces.js';
import { EchoService } from './echo.service.js';

@Controller()
class EchoController implements EchoServiceController {
  constructor(private readonly service: EchoService) {}

  @GrpcMethod('EchoService', 'Echo')
  echo(request: EchoRequest) {
    return this.service.handleEchoRequest(request);
  }

  @GrpcMethod('EchoService', 'EchoStream')
  echoStream(request: EchoStreamRequest): Observable<EchoResponse> {
    return this.service
      .handleEchoRequestStream(request)
      .pipe(map((res) => ({ message: res.value, timestamp: res.timestamp })));
  }
}

export { EchoController };
