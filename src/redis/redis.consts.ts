import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

const REDIS_CONNECTION = '@redis/connection';

export const InjectRedisConnection = () => Inject(REDIS_CONNECTION);

export const getRedisConnectionToken = () => REDIS_CONNECTION;

export type RedisClient = Redis;
