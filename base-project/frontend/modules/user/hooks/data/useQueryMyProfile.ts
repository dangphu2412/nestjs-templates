import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

type QueryMyProfileOptions = {
  enabled?: boolean;
};

export function useQueryMyProfile({ enabled }: QueryMyProfileOptions) {
  return useQuery('QUERY_MY_PROFILE', {
    queryFn: UserApiClient.getMyProfile,
    retry: false,
    enabled
  });
}
