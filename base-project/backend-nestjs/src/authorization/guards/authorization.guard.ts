import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_META_DATA_KEY } from '../decorators/can-access-by.decorator';
import { AuthExceptionClientCode } from '../../exception/exception-client-code.constant';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLE_META_DATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const canAccess = requiredRoles.some((role) => user.roles?.includes(role));

    if (!canAccess) {
      throw new ForbiddenException(AuthExceptionClientCode.FORBIDDEN);
    }

    return true;
  }
}
