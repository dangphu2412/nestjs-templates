import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { UserApiClient } from '../../services/user-api-client';

export function useMutateUserActive() {
  const toast = useToast();

  return useMutation('MUTATION_TOGGLE_USER_STATUS', {
    mutationFn: UserApiClient.toggleActive,
    onSuccess: () => {
      toast({
        title: 'Toggle user active successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });
    }
  });
}
