import { UnprocessableEntityException } from '@nestjs/common';
import { createAuthClientCode } from './create-auth-client.code';

export class IncorrectUsernamePasswordException extends UnprocessableEntityException {
  constructor() {
    super(createAuthClientCode('INCORRECT_USERNAME_OR_PASSWORD'));
  }
}
