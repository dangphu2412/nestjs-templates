import { Controller, Get, Inject } from '@nestjs/common';
import { RoleService, RoleServiceToken } from './client/role.service';

@Controller({
  path: 'roles',
  version: '1',
})
export class RoleController {
  constructor(
    @Inject(RoleServiceToken) private readonly roleService: RoleService,
  ) {}

  @Get()
  getRoles() {
    return this.roleService.getNewUserRoles();
  }
}
