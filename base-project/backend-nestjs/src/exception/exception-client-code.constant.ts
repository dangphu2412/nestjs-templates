import { generateClientException } from './exception-generator';

export const AuthExceptionClientCode = {
  DUPLICATED_USERNAME: generateClientException('AUTH__DUPLICATED_USERNAME'),
  INCORRECT_USERNAME_OR_PASSWORD: generateClientException({
    errorCode: 'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
    message: 'Incorrect username or password',
  }),
};

export const SystemExceptionClientCode = {
  MAINTENANCE: generateClientException('SYS__MAINTENANCE'),
  GOT_ISSUE: generateClientException('SYS__GOT_ISSUE'),
};
