import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (propKey: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return propKey ? req.user : req.user[propKey];
  },
);
