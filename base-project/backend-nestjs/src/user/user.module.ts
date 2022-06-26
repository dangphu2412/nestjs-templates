import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserServiceToken } from './client/user.service';
import { UserServiceImpl } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceToken,
      useClass: UserServiceImpl,
    },
  ],
  exports: [UserServiceToken],
})
export class UserModule {}
