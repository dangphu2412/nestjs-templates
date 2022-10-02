import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, User, UserService } from '../client';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UserGrpcExceptionCode } from '../../exception/exception-client-code.constant';
import { NotfoundRpcException } from '../../exception/rpc/notfound-rpc.exception';

@Injectable()
export class UserServiceImpl implements UserService {
  private static readonly logger = new Logger(UserServiceImpl.name);

  constructor(private readonly userRepository: UserRepository) {}

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotfoundRpcException(UserGrpcExceptionCode.NOT_FOUND);
    }

    return user;
  }

  async createOne(dto: CreateUserDto): Promise<string> {
    let id: string;

    try {
      const newUser = new User();

      newUser.email = dto.email;
      newUser.fullName = dto.fullName;
      newUser.password = '';

      const insertResult = await this.userRepository.insert(newUser);

      id = insertResult.identifiers[0].id;
    } catch (error) {
      UserServiceImpl.logger.error(error.message);
    }

    return id;
  }
}
