import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleServiceImpl } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleController } from './role.controller';
import { RoleStorageImpl } from './role-storage';
import { RoleAuthorizationStrategy } from './strategies/role-authorization.strategy';
import { RoleServiceToken, RoleStorageToken } from '../client';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([RoleRepository])],
  controllers: [RoleController],
  providers: [
    RoleAuthorizationStrategy,
    {
      provide: RoleServiceToken,
      useClass: RoleServiceImpl,
    },
    {
      provide: RoleStorageToken,
      useClass: RoleStorageImpl,
    },
  ],
  exports: [RoleServiceToken, RoleStorageToken],
})
export class AuthorizationModule {}
