const PREFIX_STRATEGY = 'CLIENT_';

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
      errorCode: `${PREFIX_STRATEGY}${errorOrErrorCode}`,
      message: 'Default message',
    };
  }
  return {
    errorCode: `${PREFIX_STRATEGY}${errorOrErrorCode.errorCode}`,
    message: errorOrErrorCode.message,
  };
}

export function isClientException(response: any): response is ClientError {
  return !!(response as ClientError).errorCode;
}
