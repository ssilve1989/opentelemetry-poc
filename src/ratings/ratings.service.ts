import { Traceable } from '@amplication/opentelemetry-nestjs';
import { Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js';
import { eq } from 'drizzle-orm';
import { DbConnection, InjectDbConnection } from '../db/db.consts.js';
import { movies, ratings } from '../db/schema.js';
import { InjectRedisConnection, RedisClient } from '../redis/redis.consts.js';

@Traceable()
@Injectable()
export class RatingsService {
  constructor(
    @InjectRedisConnection() private readonly redis: RedisClient,
    @InjectDbConnection() private readonly connection: DbConnection,
  ) {}

  async getRating(title: string) {
    const cachedRating = await this.checkRatingCache(title);
    if (!cachedRating) {
      const results = await this.connection
        .select({ rating: ratings.rating })
        .from(ratings)
        .leftJoin(movies, eq(ratings.movieId, movies.id))
        .where(eq(movies.title, title));

      const rating = this.computeRating(results.map((result) => result.rating));
      await this.updateCache(title, rating);
      return rating;
    }

    return Number(cachedRating);
  }

  async checkRatingCache(title: string): Promise<number | undefined> {
    const rating = await this.redis.get(`ratings:${title}`);
    return rating ? Number.parseFloat(rating) : undefined;
  }

  async updateCache(title: string, rating: number) {
    return await this.redis.set(`ratings:${title}`, rating.toString());
  }

  computeRating(ratings: number[]): number {
    return ratings
      .reduce((acc, rating) => acc.plus(rating), new Decimal(0))
      .div(ratings.length)
      .toDecimalPlaces(1)
      .toNumber();
  }
}
