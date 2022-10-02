import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryMyProfile() {
  return useQuery('QUERY_MY_PROFILE', {
    queryFn: UserApiClient.getMyProfile,
    enabled: false,
    retry: false
  });
}
