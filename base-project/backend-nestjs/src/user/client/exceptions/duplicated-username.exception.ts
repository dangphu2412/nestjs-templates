import { ConflictException } from '@nestjs/common';
import { createUserClientCode } from './create-user-client.code';

export class DuplicatedUsernameException extends ConflictException {
  constructor() {
    super(createUserClientCode('DUPLICATED_USERNAME'));
  }
}
