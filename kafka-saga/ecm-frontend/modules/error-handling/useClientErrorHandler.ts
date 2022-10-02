import { AxiosError } from 'axios';
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
  function isNetworkError(error: AxiosError) {
    return error.code === 'ERR_NETWORK';
  }

  function isClientException(response: any): response is ClientError {
    return (
      !!(response as ClientError).errorCode &&
      response?.errorCode?.startsWith('CLIENT_')
    );
  }

  return {
    handle: (error: any) => {
      if (isNetworkError(error)) {
        return {
          isClientError: false,
          isSystemError: true,
          clientCode: null,
          message: 'Getting network error'
        };
      }

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
