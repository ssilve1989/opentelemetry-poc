import { Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { getRedisConnectionToken } from './redis.consts.js';

@Global()
@Module({
  providers: [
    {
      provide: getRedisConnectionToken(),
      useFactory: () => {
        return new Redis();
      },
    },
  ],
  exports: [getRedisConnectionToken()],
})
export class RedisModule {}
