import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (propKey: string, ctx: ExecutionContext) => {
    const x = ctx.switchToRpc().getContext();
    const y = ctx.switchToRpc().getData();
    console.log(x);
    console.log(y);
    return 'data';
  },
);
