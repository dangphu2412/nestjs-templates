import { MenuService } from './client/menu.service';
import { Menu } from './entities/menu.entity';
import { MenuRepository } from './menu.repositoryt';

export class MenuServiceImpl implements MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  find(): Promise<Menu[]> {
    return this.menuRepository.findTrees();
  }
}
