import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { User } from '../entities/user.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { CreateUserDto } from '../dtos/create-user.dto';

export const UserServiceToken = randomStringGenerator();

export interface UserService {
  findOne(options: FindOneOptions<User>): Promise<User>;
  createOne(user: CreateUserDto): Promise<string>;
}
