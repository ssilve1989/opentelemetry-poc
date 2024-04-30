import { Controller, Get, Param } from '@nestjs/common';
import { RatingsService } from './ratings.service.js';

@Controller('ratings')
class RatingsController {
  constructor(private readonly service: RatingsService) {}

  @Get(':title')
  async getRatings(@Param('title') title: string) {
    return await this.service.getRating(title);
  }
}

export { RatingsController };
