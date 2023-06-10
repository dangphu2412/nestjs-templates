import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ClientErrorCode, ErrorMessageManager } from './client-code';
import { useNotify } from '@/modules/shared/hooks/useNotify.hook';

export interface AppError {
  clientCode: string;
  message: string;
}

export interface ErrorHandler {
  handle: (error: any) => void;
}

export interface ClientError extends Error {
  errorCode: string;
}

function isClientException(error: any): error is AxiosError<ClientError> {
  return !!(error?.response?.data as ClientError).errorCode;
}

function transformToAppError(error: AxiosError): AppError {
  if (error.code === AxiosError.ERR_NETWORK) {
    return {
      clientCode: AxiosError.ERR_NETWORK,
      message:
        ErrorMessageManager.get(AxiosError.ERR_NETWORK) ??
        'System is getting some problem'
    };
  }

  if (error.code === AxiosError.ECONNABORTED) {
    return {
      clientCode: AxiosError.ECONNABORTED,
      message:
        ErrorMessageManager.get(AxiosError.ECONNABORTED) ??
        'System is getting some problem'
    };
  }

  if (!isClientException(error) || !error.response?.data) {
    return {
      clientCode: ClientErrorCode.UN_HANDLE_ERROR_CLIENT,
      message: 'System is getting some problem'
    };
  }

  return {
    clientCode: error.response.data.errorCode,
    message:
      ErrorMessageManager.get(error.response.data.errorCode) ??
      'System is getting some problem'
  };
}

type ErrorHandlerProps = {
  onHandleClientError?: (error: AppError) => void;
};

export function useErrorHandler({
  onHandleClientError
}: ErrorHandlerProps = {}): ErrorHandler {
  const { push } = useRouter();
  const showToast = useNotify();

  function handle(error: any): void {
    const { clientCode, message } = transformToAppError(error);

    switch (clientCode) {
      case AxiosError.ERR_NETWORK:
      case ClientErrorCode.MAINTENANCE:
        push('/500');
        break;
      case ClientErrorCode.INVALID_TOKEN_FORMAT:
      case ClientErrorCode.LOGOUT_REQUIRED:
        push('/logout');
        break;
      case ClientErrorCode.FORBIDDEN:
        push('/403');
        break;
      default:
        if (onHandleClientError) {
          onHandleClientError({ clientCode, message });
          return;
        }

        showToast({
          title: 'Error',
          status: 'error',
          description: message
        });
        break;
    }
  }

  return {
    handle
  };
}
