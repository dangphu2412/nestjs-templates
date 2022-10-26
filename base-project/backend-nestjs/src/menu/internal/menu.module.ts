import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './menu.repositoryt';
import { MenuServiceImpl } from './menu.service';
import { MenuServiceToken } from '../client';
import { UserModule } from '../../user/internal/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([MenuRepository])],
  controllers: [MenuController],
  providers: [
    {
      provide: MenuServiceToken,
      useClass: MenuServiceImpl,
    },
  ],
})
export class MenuModule {}
