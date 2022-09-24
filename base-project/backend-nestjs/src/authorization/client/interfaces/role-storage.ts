import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Role } from '../entities/role.entity';
import { RoleMapByActiveState } from '../types/role.types';

export const RoleStorageToken = randomStringGenerator();

export interface RoleStorage {
  set(userId: string, roles: Role[]): Promise<void>;
  get(userId: string): Promise<RoleMapByActiveState>;
  clean(userId: string): Promise<void>;
}
