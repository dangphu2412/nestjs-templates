import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export const RoleStorageToken = randomStringGenerator();

export interface RoleStorage {
  set(userId: string, roles: Record<string, boolean>): Promise<void>;
  get(userId: string): Promise<Record<string, boolean> | undefined>;
  clean(userId: string): Promise<void>;
}
