import { ClientError, generateClientException } from './exception-generator';

export function createServiceExceptionGenerator(prefix: string) {
  return (errorOrCode: string | ClientError) => {
    if (typeof errorOrCode === 'string') {
      const errorCode = `${prefix}${errorOrCode}`;

      return generateClientException(errorCode);
    }

    const errorCode = `${prefix}${errorOrCode.errorCode}`;

    return generateClientException({
      errorCode,
      message: errorOrCode.message,
    });
  };
}
