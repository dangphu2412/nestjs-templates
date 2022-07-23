import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleServiceToken } from './client/role.service';
import { RoleServiceImpl } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleController } from './role.controller';
import { RoleStorageImpl } from './role-storage';
import { RoleStorageToken } from './client/role-storage';
import { RoleAuthorizationStrategy } from './strategies/role-authorization.strategy';

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
