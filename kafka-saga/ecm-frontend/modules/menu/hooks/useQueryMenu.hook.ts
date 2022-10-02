import { useQuery } from 'react-query';
import { MenuApiClient } from '../services/menu-api.client';

export function useQueryMenu() {
  return useQuery({
    queryFn: MenuApiClient.getMenus,
    queryKey: 'MENU'
  });
}
