import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './menu.repositoryt';
import { MenuServiceToken } from './client/menu.service';
import { MenuServiceImpl } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRepository])],
  controllers: [MenuController],
  providers: [
    {
      provide: MenuServiceToken,
      useClass: MenuServiceImpl,
    },
  ],
})
export class MenuModule {}
