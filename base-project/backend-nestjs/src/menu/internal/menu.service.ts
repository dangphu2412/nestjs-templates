import { MenuRepository } from './menu.repositoryt';
import { Inject, Injectable } from '@nestjs/common';
import { Menu, MenuService } from '../client';
import { UserService, UserServiceToken } from '../../user';

@Injectable()
export class MenuServiceImpl implements MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    @Inject(UserServiceToken)
    private readonly userService: UserService,
  ) {}

  async findMenusByUserId(userId: string): Promise<Menu[]> {
    const user = await this.userService.findById(userId, ['roles']);

    if (!user) {
      return [];
    }

    return this.menuRepository.findTrees();
  }
}
