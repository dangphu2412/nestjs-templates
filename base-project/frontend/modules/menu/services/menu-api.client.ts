import { ApiClient } from '@/modules/shared/services';
import { MenuItem } from '../clients/menu.api';

export const MenuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return ApiClient.get<MenuItem[], void>('/menus');
  }
};
