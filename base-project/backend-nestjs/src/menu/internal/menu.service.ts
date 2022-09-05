import { MenuRepository } from './menu.repositoryt';
import { Injectable } from '@nestjs/common';
import { Menu, MenuService } from '../client';

@Injectable()
export class MenuServiceImpl implements MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  find(): Promise<Menu[]> {
    return this.menuRepository.findTrees();
  }
}
