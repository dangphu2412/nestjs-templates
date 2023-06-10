import { useQuery } from 'react-query';
import { MenuApiClient } from '../services/menu-api.client';

export function useQueryMenu() {
  const { data } = useQuery({
    queryFn: MenuApiClient.getMenus,
    queryKey: 'MENU'
  });

  return { menus: data };
}
