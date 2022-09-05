import { Test } from '@nestjs/testing';
import { AuthServiceImpl } from '../internal/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { UnprocessableEntityException } from '@nestjs/common';
import {
  AuthService,
  AuthServiceToken,
  LoginCredentials,
  TokenDto,
  TokenGenerator,
  TokenGeneratorToken,
} from '../client';
import {
  Role,
  RoleService,
  RoleServiceToken,
  RoleStorage,
  RoleStorageToken,
} from '../../authorization';
import { User, UserService, UserServiceToken } from '../../user';

jest.mock('typeorm-transactional-cls-hooked', () => ({
  Transactional: () => () => ({}),
  initializeTransactionalContext: () => ({}),
  patchTypeORMRepositoryWithBaseRepository: () => ({}),
  BaseRepository: class {},
  IsolationLevel: {
    SERIALIZABLE: 'SERIALIZABLE',
    READ_COMMITTED: 'READ_COMMITTED',
  },
}));
describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let roleService: RoleService;
  let roleStorage: RoleStorage;
  let tokenGenerator: TokenGenerator;
  let bcryptService: BcryptService;
  const date = new Date();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AuthServiceToken,
          useClass: AuthServiceImpl,
        },
        {
          provide: UserServiceToken,
          useValue: {
            updateRolesForUser: jest.fn(),
            create: jest.fn(),
            findByUsername: jest.fn(),
          },
        },
        {
          provide: RoleServiceToken,
          useValue: {
            getNewUserRoles: jest.fn(),
          },
        },
        {
          provide: RoleStorageToken,
          useValue: {
            set: jest.fn(),
          },
        },
        {
          provide: TokenGeneratorToken,
          useValue: {
            generate: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: BcryptService,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get(AuthServiceToken);
    userService = moduleRef.get(UserServiceToken);
    roleService = moduleRef.get(RoleServiceToken);
    roleStorage = moduleRef.get(RoleStorageToken);
    tokenGenerator = moduleRef.get(TokenGeneratorToken);
    bcryptService = moduleRef.get(BcryptService);
  });

  describe('test register', () => {
    it('should register successfully', async () => {
      const mockTokensResponse: TokenDto[] = [
        {
          name: 'ac',
          value: 'asd',
          type: 'asd',
        },
      ];
      const result: LoginCredentials = {
        tokens: mockTokensResponse,
      };
      const mockRoles: Role[] = [
        {
          id: 'id',
          key: 'key',
          users: [],
          name: 'name',
          description: 'desc',
        },
      ];
      const mockUser: User = {
        id: '1',
        username: 'username',
        password: '',
        email: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };
      jest.spyOn(userService, 'findByUsername').mockResolvedValue(null);
      jest.spyOn(bcryptService, 'hash').mockResolvedValue('hashed');
      jest.spyOn(userService, 'create').mockResolvedValue(mockUser);
      jest.spyOn(roleService, 'getNewUserRoles').mockResolvedValue(mockRoles);
      jest
        .spyOn(tokenGenerator, 'generate')
        .mockResolvedValue(mockTokensResponse);

      expect(
        await authService.register({
          username: 'username',
          password: 'password',
        }),
      ).toEqual(result);

      expect(userService.updateRolesForUser).toBeCalledWith(
        mockUser,
        mockRoles,
      );
      expect(roleStorage.set).toBeCalledWith('1', { key: true });
    });

    it('should register failed because of non existing user', async () => {
      const mockUser: User = {
        id: '1',
        username: 'username',
        password: '',
        email: '',
        roles: [],
        createdAt: date,
        updatedAt: date,
        deletedAt: date,
      };
      jest.spyOn(userService, 'findByUsername').mockResolvedValue(mockUser);

      await expect(
        authService.register({
          username: 'username',
          password: 'password',
        }),
      ).rejects.toThrow(
        new UnprocessableEntityException({
          errorCode: 'AUTH__DUPLICATED_USERNAME',
          message: 'There is an error',
        }),
      );
    });
  });
});
