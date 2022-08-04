import { RoleStorage } from './client/role-storage';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';

@Injectable()
export class RoleStorageImpl implements RoleStorage {
  private static readonly ROLE_CACHE_KEY = 'RK';
  private readonly ttl: number;

  private static generateCacheKey(userId: string): string {
    return `${RoleStorageImpl.ROLE_CACHE_KEY}-${userId}`;
  }

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    configService: ConfigService,
  ) {
    const refreshTokenExpiration = configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
      '1h',
    );
    this.ttl = ms(refreshTokenExpiration);
  }

  get(userId: string): Promise<Record<string, boolean>> {
    return this.cacheManager.get(RoleStorageImpl.generateCacheKey(userId));
  }

  async set(userId: string, roles: Record<string, boolean>): Promise<void> {
    await this.cacheManager.set(
      RoleStorageImpl.generateCacheKey(userId),
      roles,
      this.ttl,
    );
  }

  async clean(userId: string): Promise<void> {
    await this.cacheManager.del(RoleStorageImpl.generateCacheKey(userId));
  }
}
