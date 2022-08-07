import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleService, RoleServiceToken } from './client/role.service';

@Controller({
  path: 'roles',
  version: '1',
})
@ApiTags('roles')
export class RoleController {
  constructor(
    @Inject(RoleServiceToken) private readonly roleService: RoleService,
  ) {}

  @Get()
  @ApiOkResponse()
  getRoles() {
    return this.roleService.getNewUserRoles();
  }
}
