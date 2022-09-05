import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException, Type } from '@nestjs/common';
import { StrategiesKeyById } from './strategies/authorization-strategy.register';
import { ROLE_META_DATA_KEY } from './decorators/can-access-by.decorator';
import { AuthorizationGuard } from '../client';

export function CreateAuthorizationGuard(
  strategyId: string,
): Type<AuthorizationGuard> {
  class MixinAuthorizationGuard implements AuthorizationGuard {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLE_META_DATA_KEY,
        [context.getHandler(), context.getClass()],
      );
      const { user } = context.switchToHttp().getRequest();
      const strategy = StrategiesKeyById[strategyId];
      const canAccess = await strategy.canAccess(user, requiredRoles);

      this.validate(canAccess);

      return true;
    }

    /**
     * @param canAccess this is the status after validation of strategy
     * We can override this to perform diff error
     */
    validate(canAccess: boolean): void {
      if (!canAccess) {
        throw new ForbiddenException();
      }
    }
  }

  return MixinAuthorizationGuard;
}
