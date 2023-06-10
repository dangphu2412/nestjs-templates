import { useMutation } from 'react-query';
import { AccessControlApiClient } from '@/modules/user/services/access-control.client';
import { UpdateRoleDto } from '@/modules/user/models/rbac.types';

export function useMutateSaveRoles() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: UpdateRoleDto) =>
      AccessControlApiClient.update(request),
    mutationKey: 'MUTATION_SAVE_ROLES'
  });

  return { saveRoles: mutate, isLoading };
}
