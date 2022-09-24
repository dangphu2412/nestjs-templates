import {
  generateClientException,
  generateSystemException,
} from './exception-generator';

export const AuthExceptionClientCode = {
  INCORRECT_USERNAME_OR_PASSWORD: generateClientException({
    errorCode: 'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
    message: 'Incorrect username or password',
  }),
  LOGOUT_REQUIRED: generateClientException('LOGOUT_REQUIRED'),
  FORBIDDEN: generateClientException('FORBIDDEN'),
  INVALID_TOKEN_FORMAT: generateClientException('INVALID_TOKEN_FORMAT'),
};

export const UserClientCode = {
  NOT_FOUND_USER: generateClientException({
    errorCode: 'USER__NOT_FOUND',
    message: 'No user(s) found',
  }),
  DUPLICATED_USERNAME: generateClientException('USER__DUPLICATED_USERNAME'),
};

export const SystemExceptionClientCode = {
  MAINTENANCE: generateSystemException('MAINTENANCE'),
  GOT_ISSUE: generateSystemException('GOT_ISSUE'),
};
