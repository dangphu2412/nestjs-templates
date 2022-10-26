import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ClientErrorCode, ErrorMessageService } from './client-code';

interface HandleResponse {
  isClientError: boolean;
  isSystemError: boolean;
  clientCode: string;
  message: string;
}

export interface ClientErrorHandler {
  handle: (error: any) => HandleResponse;
  handleExpireLogin: (err: any) => void;
}

export interface ClientError extends Error {
  errorCode: string;
}

export function useClientErrorHandler(): ClientErrorHandler {
  const { push } = useRouter();

  function isNetworkError(error: AxiosError) {
    return error.code === 'ERR_NETWORK';
  }

  function isClientException(response: any): response is ClientError {
    return (
      !!(response as ClientError).errorCode &&
      response?.errorCode?.startsWith('CLIENT_')
    );
  }

  function handleClientError(error: any) {
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
        ErrorMessageService.get(errorCode) ?? 'System is getting some problem'
    };
  }

  function handleExpireLogin(error: any): void {
    const { clientCode: renewClientCode } = handleClientError(error);

    if (
      [
        ClientErrorCode.INVALID_TOKEN_FORMAT,
        ClientErrorCode.LOGOUT_REQUIRED
      ].includes(renewClientCode)
    ) {
      push('/logout');
    }
  }

  return {
    handle: handleClientError,
    handleExpireLogin
  };
}
