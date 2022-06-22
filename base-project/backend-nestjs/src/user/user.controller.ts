import { Controller, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserService, UserServiceIT } from './client/user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    @Inject(UserServiceIT)
    private readonly userService: UserService,
  ) {}

  find(): Promise<User[]> {
    return this.userService.find();
  }
}
