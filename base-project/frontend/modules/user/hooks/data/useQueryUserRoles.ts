import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

export const QUERY_USER_ROLE_KEY = 'QUERY_USER_ROLES';

export function useQueryUserRoles(userId: string) {
  const { data, isSuccess } = useQuery({
    queryKey: QUERY_USER_ROLE_KEY,
    queryFn: () => UserApiClient.getUserRoles(userId),
    enabled: userId !== ''
  });

  return { userRoles: data, isSuccess };
}
