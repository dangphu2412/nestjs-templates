import { ClientError, generateClientException } from './exception-generator';

export function createServiceExceptionGenerator(prefix: string) {
  return (errorOrCode: string | ClientError) => {
    const errorCode = `${prefix}${errorOrCode}`;
    if (typeof errorOrCode === 'string') {
      return generateClientException(errorCode);
    }
    return generateClientException({
      errorCode,
      message: errorOrCode.message,
    });
  };
}
