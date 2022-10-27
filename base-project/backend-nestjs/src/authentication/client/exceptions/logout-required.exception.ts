import { UnauthorizedException } from '@nestjs/common';
import { createAuthClientCode } from './create-auth-client.code';

export class LogoutRequiredException extends UnauthorizedException {
  constructor() {
    super(createAuthClientCode('LOGOUT_REQUIRED'));
  }
}
