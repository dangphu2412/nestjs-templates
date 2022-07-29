import { EntityRepository, TreeRepository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@EntityRepository(Menu)
export class MenuRepository extends TreeRepository<Menu> {}
