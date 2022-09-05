import { Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService, UserServiceToken } from './client/user.service';
import { GetUserQueryDto } from './entities/dtos/get-user-query.dto';
import { UserSummary } from './entities/dtos/user-summary.response';
import { CurrentUser, Identified, JwtPayload } from '../authentication';
import { CanAccessBy, RoleDef } from '../authorization';

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
  find(@Query() query: GetUserQueryDto): Promise<UserSummary[]> {
    return this.userService.find(query);
  }

  @CanAccessBy(RoleDef.ADMIN)
  @Patch('/:id/active')
  @ApiNoContentResponse()
  async toggleIsActive(@Param('id') id: string) {
    await this.userService.toggleUserIsActive(id);
  }
}
