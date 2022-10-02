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
};

export const UserGrpcExceptionCode = {
  NOT_FOUND: generateUserException('NOT_FOUND'),
};
