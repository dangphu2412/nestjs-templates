import { Role } from '../../authorization';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CreateUserDto,
  User,
  UserManagementQuery,
  UserManagementView,
  UserService,
} from '../client';
import { MyProfile } from '../../authentication';
import { UserClientCode } from '../../exception/exception-client-code.constant';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async assertUsernameNotDuplicated(username: string): Promise<void> {
    const isUsernameExisted =
      (await this.userRepository.count({
        where: {
          username,
        },
      })) > 0;

    if (isUsernameExisted) {
      throw new ConflictException(UserClientCode.DUPLICATED_USERNAME);
    }
  }

  async getMyProfile(id: string): Promise<MyProfile | null> {
    return this.userRepository.findOne(id, {
      select: ['id', 'username'],
    });
  }

  find(query: UserManagementQuery): Promise<UserManagementView> {
    const offset = (query.page - 1) * query.size;

    return this.userRepository.find({
      skip: offset,
      take: query.size,
      withDeleted: true,
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

  findById(id: string): Promise<User | null>;
  findById(id: string, relations?: string[]): Promise<User | null>;
  findById(id: string, relations?: string[]): Promise<User | null> {
    return this.userRepository.findOne(id, {
      relations,
    });
  }
}
