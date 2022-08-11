export const RoleStorageToken = 'RoleStorageToken';

export interface RoleStorage {
  set(userId: string, roles: Record<string, boolean>): Promise<void>;
  get(userId: string): Promise<Record<string, boolean> | undefined>;
  clean(userId: string): Promise<void>;
}
