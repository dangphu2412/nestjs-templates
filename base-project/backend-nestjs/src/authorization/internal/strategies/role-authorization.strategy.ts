import { Inject, Injectable } from '@nestjs/common';
import { AuthorizationStrategy } from '../../client/interfaces/authorization';
import { RoleStorage, RoleStorageToken } from '../../client/interfaces/role-storage';
import { JwtPayload } from '../../../authentication';
import { useAuthorizationStrategy } from './authorization-strategy.register';

@Injectable()
export class RoleAuthorizationStrategy
  implements AuthorizationStrategy<JwtPayload, string[]>
{
  constructor(
    @Inject(RoleStorageToken)
    private readonly roleStorage: RoleStorage,
  ) {
    useAuthorizationStrategy(RoleAuthorizationStrategy.name, this);
  }

  async canAccess(
    providedData: JwtPayload,
    requiredRoles: string[],
  ): Promise<boolean> {
    const userRoles = await this.roleStorage.get(providedData.sub);
    if (!userRoles) {
      return false;
    }
    return requiredRoles.some((role) => userRoles[role]);
  }
}
