import { Injectable } from '@nestjs/common';
import { concatMap, of, repeat, timestamp } from 'rxjs';
import { InjectRedisConnection, RedisClient } from '../redis/redis.consts.js';
import { EchoRequest, EchoStreamRequest } from './echo.interfaces.js';
import { Traceable } from '@amplication/opentelemetry-nestjs';

@Injectable()
@Traceable()
class EchoService {
  constructor(@InjectRedisConnection() private readonly redis: RedisClient) {}

  async handleEchoRequest({ message = 'unknown message' }: EchoRequest) {
    await this.redis.rpush('echo:request:log', JSON.stringify({ message }));
    const response = { message, timestamp: Date.now() };
    await this.redis.rpush('echo:response:log', JSON.stringify(response));
    return response;
  }

  handleEchoRequestStream({
    message = 'unknown message',
    ...rest
  }: EchoStreamRequest) {
    return of(message).pipe(
      timestamp(),
      concatMap(async (msg) => {
        await this.redis.rpush(
          'echo:request:log',
          JSON.stringify({ message: msg.value, timestamp: msg.timestamp }),
        );
        return msg;
      }),

      concatMap(async (msg) => {
        await this.redis.rpush(
          'echo:response:log',
          JSON.stringify({ message: msg.value, timestamp: Date.now() }),
        );
        return msg;
      }),
      repeat(rest.repeat ?? 0),
    );
  }
}

export { EchoService };
