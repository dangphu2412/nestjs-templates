import {
  generateClientException,
  generateSystemException,
} from './exception-generator';

export const AuthExceptionClientCode = {
  DUPLICATED_USERNAME: generateClientException('AUTH__DUPLICATED_USERNAME'),
  INCORRECT_USERNAME_OR_PASSWORD: generateClientException({
    errorCode: 'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
    message: 'Incorrect username or password',
  }),
  LOGOUT_REQUIRED: generateClientException('LOGOUT_REQUIRED'),
  FORBIDDEN: generateClientException('FORBIDDEN'),
};

export const SystemExceptionClientCode = {
  MAINTENANCE: generateSystemException('MAINTENANCE'),
  GOT_ISSUE: generateSystemException('GOT_ISSUE'),
};
