import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  let request = context.switchToHttp().getRequest<any>();

  return request.user;
});
