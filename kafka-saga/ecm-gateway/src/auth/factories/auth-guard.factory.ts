import { ExecutionContext, Type, CanActivate } from '@nestjs/common';
import { IdMapToStrategy } from '../strategies/auth-strategy.loader';
import { Constructor } from '../../core/client/util.type';

export function CreateAuthGuard(strategyId: Constructor): Type<CanActivate> {
  class MixinAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const strategy = IdMapToStrategy[strategyId.name];

      return await strategy.validate(context);
    }
  }

  return MixinAuthGuard;
}
