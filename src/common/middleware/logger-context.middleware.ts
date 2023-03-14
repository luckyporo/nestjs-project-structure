import { Injectable, NestMiddleware } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://docs.nestjs.com/graphql/field-middleware

  constructor(private readonly logger: PinoLogger) {}

  public use(req: any, _res: any, next: () => void): void {
    const user = req.user?.userId;
    // Add extra fields to share in logger context
    this.logger.assign({ user });

    return next();
  }
}
