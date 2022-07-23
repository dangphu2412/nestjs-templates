import { RoleStorage } from './client/role-storage';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class RoleStorageImpl implements RoleStorage {
  private static readonly ROLE_CACHE_KEY = 'RK';
  private static readonly TTL = 3600;

  private static generateCacheKey(userId: string): string {
    return `${RoleStorageImpl.ROLE_CACHE_KEY}-${userId}`;
  }

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  get(userId: string): Promise<Record<string, boolean>> {
    return this.cacheManager.get(RoleStorageImpl.generateCacheKey(userId));
  }

  async set(userId: string, roles: Record<string, boolean>): Promise<void> {
    await this.cacheManager.set(
      RoleStorageImpl.generateCacheKey(userId),
      roles,
      RoleStorageImpl.TTL,
    );
  }
}
