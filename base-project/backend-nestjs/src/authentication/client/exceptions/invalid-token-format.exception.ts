import { BadRequestException } from '@nestjs/common';
import { createAuthClientCode } from './create-auth-client.code';

export class InvalidTokenFormatException extends BadRequestException {
  constructor() {
    super(createAuthClientCode('INVALID_TOKEN_FORMAT'));
  }
}
