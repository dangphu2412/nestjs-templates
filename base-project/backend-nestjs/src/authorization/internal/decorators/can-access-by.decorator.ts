import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleAuthorizationGuard } from '../guards/role-authorization.guard';
import { Identified } from '../../../authentication';

export const ROLE_META_DATA_KEY = 'roles';

export function CanAccessBy(...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLE_META_DATA_KEY, roles),
    Identified,
    UseGuards(RoleAuthorizationGuard),
  );
}
