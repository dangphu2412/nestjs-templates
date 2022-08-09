import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './client/user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './entities/dtos/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../authorization/entities/role.entity';
import { MyProfile } from '../authentication/entities/my-profile';
import { GetUserQueryDto } from './entities/dtos/get-user-query.dto';
import { UserSummary } from './entities/dtos/user-summary.response';
import { UserClientCode } from '../exception/exception-client-code.constant';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMyProfile(id: string): Promise<MyProfile | null> {
    return this.userRepository.findOne(id, {
      select: ['id', 'username'],
    });
  }

  find(query: GetUserQueryDto): Promise<UserSummary[]> {
    const offset = (query.page - 1) * query.size;
    return this.userRepository.find({
      skip: offset,
      take: query.size,
    });
  }

  findByUsername(username: string): Promise<User>;
  findByUsername(username: string, relations: string[]): Promise<User>;
  findByUsername(username: string, relations?: string[]): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations,
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const entity = new User();

    entity.username = dto.username;
    entity.email = '';
    entity.password = dto.password;

    return this.userRepository.save(entity);
  }

  async updateRolesForUser(user: User, roles: Role[]) {
    user.roles = roles;
    await this.userRepository.save(user, { reload: false });
  }

  async toggleUserIsActive(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id, {
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException(UserClientCode.NOT_FOUND_USER);
    }

    if (user.deletedAt === null) {
      await this.userRepository.softDelete(id);
      return;
    }

    await this.userRepository.restore(id);
  }
}
