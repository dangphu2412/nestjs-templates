import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CreateAuthorizationGuard } from '../guard-factory';
import { RoleAuthorizationStrategy } from '../strategies/role-authorization.strategy';

@Injectable()
export class RoleAuthorizationGuard extends CreateAuthorizationGuard(
  RoleAuthorizationStrategy.name,
) {
  constructor(private reflector: Reflector) {
    super(reflector);
  }
}
