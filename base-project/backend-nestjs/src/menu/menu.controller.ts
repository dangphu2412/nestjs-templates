import { MenuService, MenuServiceToken } from './client/menu.service';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('menus')
export class MenuController {
  constructor(
    @Inject(MenuServiceToken)
    private readonly menuService: MenuService,
  ) {}

  @Get()
  find() {
    return this.menuService.find();
  }
}
