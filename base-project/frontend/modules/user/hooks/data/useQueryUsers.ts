import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryUsers() {
  return useQuery('QUERY_USERS', {
    queryFn: UserApiClient.getMany,
    enabled: true
  });
}
