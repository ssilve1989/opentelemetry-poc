import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get('alive')
  alive() {
    return 'ok';
  }

  @Get('ready')
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
