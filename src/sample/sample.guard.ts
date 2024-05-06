import { CanActivate, Logger } from '@nestjs/common';
import { Traceable } from '../decorators/traceable';

@Traceable()
class SampleGuard implements CanActivate {
  private readonly logger = new Logger(SampleGuard.name);

  canActivate() {
    this.logger.log('im a sample log that does nothing look at me.');
    // return timer(250).pipe(map(() => true));
    return true;
  }
}

export { SampleGuard };
