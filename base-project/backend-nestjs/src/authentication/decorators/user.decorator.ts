import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (propKey: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return propKey ? req.user[propKey] : req.user;
  },
);
