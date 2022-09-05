import { Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  UserService,
  UserServiceToken,
} from '../client/interfaces/user.service';
import { UserManagementQuery } from '../client/dtos/user-management-query.dto';
import { CurrentUser, Identified, JwtPayload } from '../../authentication';
import { CanAccessBy, RoleDef } from '../../authorization';
import { UserManagementView } from '../client/types/user-management-view.types';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: UserService,
  ) {}

  @Identified
  @Get('/me')
  @ApiOkResponse()
  getMyProfile(@CurrentUser() user: JwtPayload) {
    return this.userService.getMyProfile(user.sub);
  }

  @CanAccessBy(RoleDef.ADMIN)
  @Get('/')
  @ApiOkResponse()
  find(@Query() query: UserManagementQuery): Promise<UserManagementView> {
    return this.userService.find(query);
  }

  @CanAccessBy(RoleDef.ADMIN)
  @Patch('/:id/active')
  @ApiNoContentResponse()
  async toggleIsActive(@Param('id') id: string) {
    await this.userService.toggleUserIsActive(id);
  }
}
