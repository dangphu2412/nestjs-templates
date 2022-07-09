import { ClientCodeManager } from './client-code';

interface HandleResponse {
  isClientError: boolean;
  isSystemError: boolean;
  message: string;
}

export interface ClientErrorHandler {
  handle: (error: any) => HandleResponse;
}

export interface ClientError extends Error {
  errorCode: string;
}

export function useClientErrorHandler(): ClientErrorHandler {
  function isClientException(response: any): response is ClientError {
    return (
      !!(response as ClientError).errorCode &&
      response.errorCode.startsWith('CLIENT_')
    );
  }

  return {
    handle: (error: any) => {
      const isClientError = isClientException(error.response.data);

      return {
        isClientError,
        isSystemError: error.response.status >= 500,
        message:
          ClientCodeManager.get(error.response.data.errorCode) ??
          'System is getting some problem'
      };
    }
  };
}
