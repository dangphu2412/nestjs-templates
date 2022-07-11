import { Module } from '@nestjs/common';
import { RoleServiceToken } from './client/role.service';
import { RoleServiceImpl } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleServiceToken,
      useClass: RoleServiceImpl,
    },
  ],
  exports: [RoleServiceToken],
})
export class AuthorizationModule {}
