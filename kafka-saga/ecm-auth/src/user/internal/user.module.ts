import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceToken } from '../client';
import { UserServiceImpl } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    {
      provide: UserServiceToken,
      useClass: UserServiceImpl,
    },
  ],
  exports: [UserServiceToken],
})
export class UserModule {}
