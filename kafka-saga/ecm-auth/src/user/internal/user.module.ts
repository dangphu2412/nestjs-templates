import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceToken } from '../client';
import { UserServiceImpl } from './user.service';
import { UserRepository } from './user.repository';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    {
      provide: UserServiceToken,
      useClass: UserServiceImpl,
    },
    UserMapper,
  ],
  exports: [UserServiceToken, UserMapper],
})
export class UserModule {}
