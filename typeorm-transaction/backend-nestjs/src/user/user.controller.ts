import { Controller, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService, UserServiceToken } from './client/user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: UserService,
  ) {}

  find(): Promise<User[]> {
    return this.userService.find();
  }
}