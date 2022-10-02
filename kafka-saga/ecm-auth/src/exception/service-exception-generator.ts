import { createServiceExceptionGenerator } from './exception-generator.factory';

export const generateAuthException = createServiceExceptionGenerator('AUTH_');
export const generateUserException = createServiceExceptionGenerator('USER_');
