import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  AuthApiClient,
  BasicLoginRequest,
  LoginGoogleRequest,
  Tokens
} from '../services/auth-api-client';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';
import { useClientErrorHandler } from '../../error-handling/useClientErrorHandler';

export function useLoginMutation() {
  const toast = useToast();
  const errorHandler = useClientErrorHandler();
  const router = useRouter();

  const { isLoading, mutate } = useMutation<
    Tokens,
    unknown,
    BasicLoginRequest | LoginGoogleRequest
  >(AuthApiClient.login, {
    mutationKey: 'POST_LOGIN',
    onSuccess: async data => {
      registerBrowserStorage();

      data.tokens.forEach(token => {
        BrowserStorage.set(token.name, token.value);
      });

      await router.push('/');
    },
    onError: error => {
      const { isClientError, isSystemError, message } =
        errorHandler.handle(error);
      if (isClientError) {
        toast({
          title: message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
        return;
      }

      if (isSystemError) {
        toast({
          title: message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        });
      }
    }
  });

  return { isLoading, mutate };
}
