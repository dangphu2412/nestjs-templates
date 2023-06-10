import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { UserApiClient } from '@/modules/user/services/user-api-client';
import { userActions } from '@/modules/user/store/user.slice';
import {
  AppError,
  useErrorHandler
} from '@/modules/error-handling/useErrorHandler';
import { ClientErrorCode } from '@/modules/error-handling/client-code';
import { useNotify } from '@/modules/shared/hooks/useNotify.hook';

export function useMutateCreateUser() {
  const dispatch = useDispatch();
  const notify = useNotify();

  function handleMutateCreateUserError({ clientCode, message }: AppError) {
    if (clientCode === ClientErrorCode.USER_EMAIL_EXISTED) {
      return notify({
        title: 'Email existed',
        status: 'error',
        description: message
      });
    }

    if (clientCode === ClientErrorCode.NOT_FOUND_USER) {
      return notify({
        title: 'This user is not ready to become member',
        status: 'error',
        description: message
      });
    }
  }

  const { handle } = useErrorHandler({
    onHandleClientError: handleMutateCreateUserError
  });

  return useMutation({
    mutationKey: 'MUTATION_CREATE_USER',
    mutationFn: UserApiClient.createUser,
    onSuccess() {
      notify({
        title: 'Create user successfully',
        status: 'success'
      });

      dispatch(userActions.setIsSubmitted(true));
    },
    onError: handle
  });
}
