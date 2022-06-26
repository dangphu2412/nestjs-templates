import { Module } from '@nestjs/common';
import { RoleServiceToken } from './client/role.service';
import { RoleServiceImpl } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [
    {
      provide: RoleServiceToken,
      useClass: RoleServiceImpl,
    },
  ],
  exports: [RoleServiceToken],
})
export class AuthorizationModule {}
