import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SampleGuard implements CanActivate {
  private readonly logger = new Logger(SampleGuard.name);

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('im a sample log that does nothing look at me.');
    return true;
  }
}
