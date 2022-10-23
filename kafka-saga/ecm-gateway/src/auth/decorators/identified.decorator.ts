import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards';

export const Identified = applyDecorators(
  UseGuards(AuthGuard),
  ApiBearerAuth(),
  ApiUnauthorizedResponse({ description: 'Unauthorized' }),
);
