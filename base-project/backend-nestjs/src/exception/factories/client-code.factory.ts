import { ClientError } from '../exception-generator';

export type ClientCodeFactory = (
  errorOrErrorCode: ClientError | string,
) => ClientError;

export function createClientCodeFactory(module = 'SYSTEM'): ClientCodeFactory {
  return (errorOrErrorCode) => {
    if (typeof errorOrErrorCode === 'string') {
      return {
        errorCode: `${module}${errorOrErrorCode}`,
        message: 'There is a system error',
      };
    }

    return {
      errorCode: `${module}${errorOrErrorCode.errorCode}`,
      message: errorOrErrorCode.message,
    };
  };
}

export const createSystemClientCode = createClientCodeFactory();
