import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Identified } from '../../authentication/decorators/identified.decorator';
import { RoleAuthorizationGuard } from '../guards/role-authorization.guard';

export const ROLE_META_DATA_KEY = 'roles';

export function CanAccessBy(...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLE_META_DATA_KEY, roles),
    Identified,
    UseGuards(RoleAuthorizationGuard),
  );
}
