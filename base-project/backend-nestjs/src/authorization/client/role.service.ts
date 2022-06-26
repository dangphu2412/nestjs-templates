import { Role } from '../entities/role.entity';

export const RoleServiceToken = 'RoleServiceToken';

export interface RoleService {
  getNewUserRoles(): Promise<Role[]>;
}
