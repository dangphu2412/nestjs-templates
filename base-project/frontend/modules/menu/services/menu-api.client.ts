import { ApiClient } from '../../shared/api/api-client';
import { MenuItem } from '../clients/menu.api';

export const MenuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return ApiClient.get<MenuItem[], void>('/menus');
  }
};
