import { UserService } from './client/user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './entities/dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from '../authorization/entities/role.entity';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  create(dto: CreateUserDto): Promise<User> {
    const entity = new User();
    entity.username = dto.username;
    entity.email = '';

    return this.userRepository.save(entity);
  }

  async updateRolesForUser(user: User, roles: Role[]) {
    user.roles = roles;
    await this.userRepository.save(user, { reload: false });
  }
}
