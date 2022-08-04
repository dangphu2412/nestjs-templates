export const RoleStorageToken = 'RoleServiceToken';

export interface RoleStorage {
  set(userId: string, roles: Record<string, boolean>): Promise<void>;
  get(userId: string): Promise<Record<string, boolean>>;
  clean(userId: string): Promise<void>;
}
