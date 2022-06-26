import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserServiceToken } from './client/user.service';
import { UserServiceImpl } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
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
