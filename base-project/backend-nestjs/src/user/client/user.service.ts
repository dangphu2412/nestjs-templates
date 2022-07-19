import { User } from '../entities/user.entity';
import { CreateUserDto } from '../entities/dtos/create-user.dto';
import { Role } from '../../authorization/entities/role.entity';
import { MyProfile } from '../../authentication/entities/my-profile';
import { GetUserQueryDto } from '../entities/dtos/get-user-query.dto';

export const UserServiceToken = 'UserServiceToken';

export interface UserService {
  find(query: GetUserQueryDto): Promise<User[]>;

  findByUsername(username: string): Promise<User>;
  findByUsername(username: string, relations: string[]): Promise<User>;

  getMyProfile(id: string): Promise<MyProfile>;

  create(dto: CreateUserDto): Promise<User>;
  updateRolesForUser(user: User, roles: Role[]): Promise<void>;
}
