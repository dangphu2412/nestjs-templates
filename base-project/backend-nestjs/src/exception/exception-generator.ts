const PREFIX_CLIENT_STRATEGY = 'CLIENT_';
const PREFIX_SYSTEM_STRATEGY = 'SYS_';

export interface ClientError {
  errorCode: string;
  message?: string;
}

export function generateClientException(errorOrErrorCode: string): ClientError;
export function generateClientException(
  errorOrErrorCode: ClientError,
): ClientError;
export function generateClientException(
  errorOrErrorCode: ClientError | string,
): ClientError {
  if (typeof errorOrErrorCode === 'string') {
    return {
      errorCode: `${PREFIX_CLIENT_STRATEGY}${errorOrErrorCode}`,
      message: 'There is an error',
    };
  }
  return {
    errorCode: `${PREFIX_CLIENT_STRATEGY}${errorOrErrorCode.errorCode}`,
    message: errorOrErrorCode.message,
  };
}

export function generateSystemException(
  errorOrErrorCode: ClientError | string,
): ClientError {
  if (typeof errorOrErrorCode === 'string') {
    return {
      errorCode: `${PREFIX_SYSTEM_STRATEGY}${errorOrErrorCode}`,
      message: 'There is a system error',
    };
  }
  return {
    errorCode: `${PREFIX_SYSTEM_STRATEGY}${errorOrErrorCode.errorCode}`,
    message: errorOrErrorCode.message,
  };
}

export function isClientException(response: any): response is ClientError {
  return !!(response as ClientError).errorCode;
}
