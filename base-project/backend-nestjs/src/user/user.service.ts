import { UserService } from './client/user.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  find(): Promise<User[]> {
    return Promise.resolve([]);
  }
}
