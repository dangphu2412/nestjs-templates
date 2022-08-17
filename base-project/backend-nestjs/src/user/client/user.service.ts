import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../entities/dtos/create-user.dto';
import { Role } from '../../authorization/entities/role.entity';
import { MyProfile } from '../../authentication/entities/my-profile';
import { GetUserQueryDto } from '../entities/dtos/get-user-query.dto';
import { UserSummary } from '../entities/dtos/user-summary.response';

export const UserServiceToken = randomStringGenerator();

export interface UserService {
  find(query: GetUserQueryDto): Promise<UserSummary[]>;

  findByUsername(username: string): Promise<User>;
  findByUsername(username: string, relations: string[]): Promise<User>;

  getMyProfile(id: string): Promise<MyProfile>;

  create(dto: CreateUserDto): Promise<User>;
  updateRolesForUser(user: User, roles: Role[]): Promise<void>;
  toggleUserIsActive(id: string): Promise<void>;
}
