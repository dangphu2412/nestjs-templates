import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Menu } from '../entities/menu.entity';

export const MenuServiceToken = randomStringGenerator();

export interface MenuService {
  findMenusByUserId(userId: string): Promise<Menu[]>;
}
