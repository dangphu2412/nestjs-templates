import { Test } from '@nestjs/testing';
import { UserService, UserServiceToken } from '../../user/client/user.service';
import { AuthService, AuthServiceToken } from '../client/auth.service';
import { AuthServiceImpl } from '../auth.service';
import {
  RoleService,
  RoleServiceToken,
} from '../../authorization/client/role.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../shared/bcrypt.service';
import {
  RoleStorage,
  RoleStorageToken,
} from '../../authorization/client/role-storage';
import { TokenGenerator, TokenGeneratorToken } from '../client/token-generator';
import {
  FinishLoginResponseDto,
  TokenDto,
} from '../entities/dtos/finish-login-response.dto';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../authorization/entities/role.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let roleService: RoleService;
  let roleStorage: RoleStorage;
  let tokenGenerator: TokenGenerator;
  let bcryptService: BcryptService;
  let jwtService: JwtService;
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
            hash: jest.fn(),
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
    jwtService = moduleRef.get(JwtService);
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
      const result: FinishLoginResponseDto = {
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
  });
});
