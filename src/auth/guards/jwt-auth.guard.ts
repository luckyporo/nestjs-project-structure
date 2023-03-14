import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest<any>();
  }
}
