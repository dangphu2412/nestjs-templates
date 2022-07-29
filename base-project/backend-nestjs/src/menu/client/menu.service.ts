import { Menu } from '../entities/menu.entity';

export const MenuServiceToken = 'MenuServiceToken';

export interface MenuService {
  find(): Promise<Menu[]>;
}
