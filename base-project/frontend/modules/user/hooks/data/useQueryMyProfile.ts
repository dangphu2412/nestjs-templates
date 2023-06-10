import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryMyProfile({ enabled = true }) {
  return useQuery({
    queryKey: 'QUERY_MY_PROFILE',
    queryFn: UserApiClient.getMyProfile,
    enabled
  });
}
