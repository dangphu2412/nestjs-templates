import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService, UserServiceToken } from './client/user.service';
import { CurrentUser } from '../authentication/decorators/user.decorator';
import { User } from './entities/user.entity';
import { JwtPayload } from '../authentication/entities/jwt-payload';
import { CanAccessBy } from '../authorization/decorators/can-access-by.decorator';
import { Identified } from '../authentication/decorators/identified.decorator';
import { GetUserQueryDto } from './entities/dtos/get-user-query.dto';
import { RoleDef } from '../authorization/constants/role-def.enum';

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
  getMyProfile(@CurrentUser() user: JwtPayload) {
    return this.userService.getMyProfile(user.sub);
  }

  @CanAccessBy(RoleDef.ADMIN)
  @Get('/')
  find(@Query() query: GetUserQueryDto): Promise<User[]> {
    return this.userService.find(query);
  }
}
