import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/jwt/jwt.guard';

export const ROLE_META_DATA_KEY = 'roles';

export function CanAccessBy(...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLE_META_DATA_KEY, roles),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
