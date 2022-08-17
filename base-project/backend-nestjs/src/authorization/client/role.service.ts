import { Role } from '../entities/role.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export const RoleServiceToken = randomStringGenerator();

export interface RoleService {
  getNewUserRoles(): Promise<Role[]>;
}
