import { EntityRepository, TreeRepository } from 'typeorm';
import { Menu } from '../client';

@EntityRepository(Menu)
export class MenuRepository extends TreeRepository<Menu> {}
