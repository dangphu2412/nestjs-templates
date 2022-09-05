import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService, UserServiceToken } from '../client/user.service';
import { UserSummary } from '../entities/dtos/user-summary.response';
import { UserServiceImpl } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../entities/user.entity';
import { GetUserQueryDto } from '../entities/dtos/get-user-query.dto';
import { CreateUserDto } from '../entities/dtos/create-user.dto';
import { Role } from '../../authorization';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const date = new Date();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserServiceToken,
          useClass: UserServiceImpl,
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
            restore: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserServiceToken);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('UserService.getMyProfile', () => {
    it('should return my profile', async () => {
      const result: User = {
        id: '1',
        username: 'username',
        password: '',
        email: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(result);
      expect(await userService.getMyProfile('id')).toEqual(result);
      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith('id', {
        select: ['id', 'username'],
      });
    });
  });

  describe('UserService.find', () => {
    it('should return user summaries', async () => {
      const result: UserSummary[] = [
        {
          id: '1',
          username: 'username',
          email: '',
          createdAt: date,
          updatedAt: date,
          deletedAt: date,
        },
      ];
      const query: GetUserQueryDto = {
        size: 10,
        page: 1,
        activeDateRange: {
          toDate: date,
          fromDate: date,
        },
      };
      jest.spyOn(userRepository, 'find').mockResolvedValue(result as User[]);
      expect(await userService.find(query)).toEqual(result);
      expect(userRepository.find).toBeCalledTimes(1);
      expect(userRepository.find).toBeCalledWith({
        skip: 0,
        take: 10,
      });
    });

    it('should return empty data when no records found', async () => {
      const query: GetUserQueryDto = {
        size: 10,
        page: 1,
        activeDateRange: {
          toDate: date,
          fromDate: date,
        },
      };
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);
      expect(await userService.find(query)).toHaveLength(0);
      expect(userRepository.find).toBeCalledTimes(1);
      expect(userRepository.find).toBeCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('UserService.findByUsername', () => {
    it('should return user without relations attached', async () => {
      const result: Omit<User, 'roles'> = {
        id: '1',
        username: 'username',
        email: '',
        password: '',
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(result as User);
      expect(await userService.findByUsername('username')).toEqual(result);
      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith({
        where: {
          username: 'username',
        },
        relations: undefined,
      });
    });

    it('should return user within relation specified', async () => {
      const result: User = {
        id: '1',
        username: 'username',
        email: '',
        password: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(result);
      expect(await userService.findByUsername('username', ['roles'])).toEqual(
        result,
      );
      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith({
        where: {
          username: 'username',
        },
        relations: ['roles'],
      });
    });

    it('should return no data', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      expect(await userService.findByUsername('username')).toBeUndefined();
      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith({
        where: {
          username: 'username',
        },
        relations: undefined,
      });
    });
  });

  describe('UserService.create', () => {
    it('should create user successfully', async () => {
      const result: Omit<User, 'roles'> = {
        id: '1',
        username: 'username',
        email: '',
        password: '',
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };
      const dto: CreateUserDto = {
        username: 'username',
        password: 'password',
      };

      jest.spyOn(userRepository, 'save').mockResolvedValue(result as User);
      expect(await userService.create(dto)).toEqual(result);
      expect(userRepository.save).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledWith({
        username: 'username',
        password: 'password',
        email: '',
      });
    });
  });

  describe('UserService.updateRolesForUser', () => {
    it('should update roles for user successfully', async () => {
      const user: User = {
        id: '1',
        username: 'username',
        email: '',
        password: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };
      const mockRoles: Role[] = [
        {
          id: 'id',
          key: 'testKey',
          name: 'testName',
          description: '',
          users: [],
        },
      ];

      await userService.updateRolesForUser(user, mockRoles);
      expect(userRepository.save).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledWith(
        {
          id: '1',
          username: 'username',
          email: '',
          password: '',
          roles: [
            {
              id: 'id',
              key: 'testKey',
              name: 'testName',
              description: '',
              users: [],
            },
          ],
          createdAt: date,
          updatedAt: date,
          deletedAt: date,
        },
        {
          reload: false,
        },
      );
    });
  });

  describe('UserService.toggleUserIsActive', () => {
    it('should soft delete user when user is active', async () => {
      const user: User = {
        id: '1',
        username: 'username',
        email: '',
        password: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: null,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      await userService.toggleUserIsActive('id');

      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith('id', {
        withDeleted: true,
      });
      expect(userRepository.softDelete).toBeCalledTimes(1);
      expect(userRepository.softDelete).toBeCalledWith('id');
    });

    it('should restore inactive user', async () => {
      const user: User = {
        id: '1',
        username: 'username',
        email: '',
        password: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      await userService.toggleUserIsActive('id');

      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith('id', {
        withDeleted: true,
      });
      expect(userRepository.restore).toBeCalledWith('id');
    });

    it('should throw error when no user found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(userService.toggleUserIsActive('id')).rejects.toThrow(
        new NotFoundException({
          errorCode: 'USER__NOT_FOUND',
          message: 'No user(s) found',
        }),
      );

      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith('id', {
        withDeleted: true,
      });
    });
  });
});
