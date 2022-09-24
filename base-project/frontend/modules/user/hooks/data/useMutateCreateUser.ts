import { useMutation, useQueryClient } from 'react-query';
import { UserApiClient } from '@modules/user/services/user-api-client';
import { useSelector } from 'react-redux';
import { selectQueryUsersKey } from '@modules/user/store/user.selector';
import { useToast } from '@chakra-ui/react';

export function useMutateCreateUser() {
  const { invalidateQueries } = useQueryClient();
  const queryUsersKey = useSelector(selectQueryUsersKey);
  const toast = useToast();

  return useMutation('MUTATION_CREATE_USER', {
    mutationFn: UserApiClient.createUser,
    async onSuccess() {
      toast({
        title: 'Toggle user active successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
      await invalidateQueries(queryUsersKey);
    }
  });
}
