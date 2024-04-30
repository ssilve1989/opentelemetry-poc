import { Traceable } from '@amplication/opentelemetry-nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
@Traceable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
