import { ClientCodeManager } from './client-code';

interface HandleResponse {
  isClientError: boolean;
  isSystemError: boolean;
  clientCode: string;
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
      response?.errorCode?.startsWith('CLIENT_')
    );
  }

  return {
    handle: (error: any) => {
      const isClientError = isClientException(error?.response?.data);
      const errorCode = error?.response?.data?.errorCode;
      return {
        isClientError,
        isSystemError: error.response.status >= 500,
        clientCode: errorCode ?? error.response.status,
        message:
          ClientCodeManager.get(errorCode) ?? 'System is getting some problem'
      };
    }
  };
}
