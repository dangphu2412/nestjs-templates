import {
  generateAuthException,
  generateUserException,
} from './service-exception-generator';

export const AuthGrpcExceptionCode = {
  MAINTENANCE: generateAuthException('MAINTENANCE'),
  GOT_ISSUE: generateAuthException('GOT_ISSUE'),
  MISSING_AUTH_SCOPE_PROVIDED: generateAuthException({
    errorCode: 'MISSING_AUTH_SCOPE_PROVIDED',
    message: 'IdToken provided is missing scope profile when requested',
  }),
  INVALID_ID_TOKEN: generateAuthException({
    errorCode: 'INVALID_ID_TOKEN',
    message: 'IdToken provided is invalid. Please check idToken again',
  }),
};

export const UserGrpcExceptionCode = {
  NOT_FOUND: generateUserException('NOT_FOUND'),
};
