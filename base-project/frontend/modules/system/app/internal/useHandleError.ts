import {
  ErrorUseCase,
  ErrorDeps
} from '@/modules/system/domain/usecases/error.usecase';
import { useCallback } from 'react';
import { useNotify } from '@/modules/shared/hooks/useNotify.hook';

export const useHandleError: ErrorUseCase = (deps?: ErrorDeps) => {
  const showToast = useNotify();

  return useCallback(
    (error: unknown) => {
      if (!error) {
        return;
      }

      showToast({
        title: 'Error',
        status: 'error',
        description: error as string
      });
    },
    [showToast]
  );
};
