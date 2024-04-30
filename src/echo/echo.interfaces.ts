import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export type EchoRequest = {
  message?: string;
};

export type EchoResponse = {
  message?: string;
  timestamp?: number;
};

export type EchoStreamRequest = {
  message?: string;
  repeat?: number;
};

interface EchoServiceClient {}

export interface EchoServiceController {
  echo(
    request: EchoRequest,
    metadata: Metadata,
    ...rest: any[]
  ): EchoResponse | Promise<EchoResponse> | Observable<EchoResponse>;

  echoStream(
    request: EchoStreamRequest,
    metadata: Metadata,
    ...rest: any[]
  ): Observable<EchoResponse>;
}
