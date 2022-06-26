import { UserService } from './client/user.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './entities/dtos/create-user.dto';

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  find(): Promise<User[]> {
    return Promise.resolve([]);
  }

  findByUsername(username: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  create(dto: CreateUserDto): Promise<User> {
    return Promise.resolve(undefined);
  }
}
