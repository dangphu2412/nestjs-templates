import { ApiClient } from '../../shared/services/api-client';
import { MenuItem } from '../clients/menu.api';

export const MenuApiClient = {
  getMenus(): Promise<MenuItem[]> {
    return ApiClient.get<MenuItem[], void>('/menus');
  }
};
