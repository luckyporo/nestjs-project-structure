import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalLoginGuard extends AuthGuard('local') implements CanActivate {
  public override async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = <boolean>await super.canActivate(context);
    const request = context.switchToHttp().getRequest<any>();
    await super.logIn(request);

    return result;
  }
}
