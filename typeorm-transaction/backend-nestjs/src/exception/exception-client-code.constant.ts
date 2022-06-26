import { generateClientException } from './exception-generator';

export const AuthExceptionClientCode = {
  DUPLICATED_USERNAME: generateClientException('AUTH__DUPLICATED_USERNAME'),
  INCORRECT_USERNAME_OR_PASSWORD: generateClientException(
    'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
  ),
};

export const SystemExceptionClientCode = {
  MAINTENANCE: generateClientException('SYS__MAINTENANCE'),
  GOT_ISSUE: generateClientException('SYS__GOT_ISSUE'),
};
