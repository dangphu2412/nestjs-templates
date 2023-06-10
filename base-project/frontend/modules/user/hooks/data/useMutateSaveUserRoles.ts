import { useMutation } from 'react-query';
import { UserApiClient } from '@/modules/user/services/user-api-client';

export function useMutateSaveUserRoles() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_SAVE_USER_ROLES',
    mutationFn: UserApiClient.updateUserRoles
  });

  return { saveUserRoles: mutate, isLoading };
}
