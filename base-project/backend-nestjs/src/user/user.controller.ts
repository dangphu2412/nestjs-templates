import { Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService, UserServiceToken } from './client/user.service';
import { CurrentUser } from '../authentication/decorators/user.decorator';
import { JwtPayload } from '../authentication/entities/jwt-payload';
import { CanAccessBy } from '../authorization/decorators/can-access-by.decorator';
import { Identified } from '../authentication/decorators/identified.decorator';
import { GetUserQueryDto } from './entities/dtos/get-user-query.dto';
import { RoleDef } from '../authorization/constants/role-def.enum';
import { UserSummary } from './entities/dtos/user-summary.response';

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
