import { useQuery } from 'react-query';
import { AccessControlApiClient } from '@/modules/user/services/access-control.client';

export function useQueryControlList() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'QUERY_CONTROL_LIST',
    queryFn: () => AccessControlApiClient.get()
  });

  return { allRoles: data, isLoading, isSuccess };
}
