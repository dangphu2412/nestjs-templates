import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { User } from '../entities/user.entity';
import { UserManagementView } from '../types/user-management-view.types';
import { UserManagementQuery } from '../dtos/user-management-query.dto';
import { Role } from '../../../authorization';
import { MyProfile } from '../../../authentication';
import { CreateUserDto } from '../dtos/create-user.dto';

export const UserServiceToken = randomStringGenerator();

export interface UserService {
  find(query: UserManagementQuery): Promise<UserManagementView>;

  findByUsername(username: string): Promise<User>;
  findByUsername(username: string, relations: string[]): Promise<User>;

  getMyProfile(id: string): Promise<MyProfile>;

  create(dto: CreateUserDto): Promise<User>;
  updateRolesForUser(user: User, roles: Role[]): Promise<void>;
  toggleUserIsActive(id: string): Promise<void>;
}
