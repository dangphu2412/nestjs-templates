import { useMutation } from 'react-query';
import { UserApiClient } from '@modules/user/services/user-api-client';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { userActions } from '@modules/user/store/user.slice';

export function useMutateCreateUser() {
  const dispatch = useDispatch();
  const toast = useToast();

  return useMutation('MUTATION_CREATE_USER', {
    mutationFn: UserApiClient.createUser,
    onSuccess() {
      toast({
        title: 'Create user successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      dispatch(userActions.setIsSubmitted(true));
    }
  });
}
