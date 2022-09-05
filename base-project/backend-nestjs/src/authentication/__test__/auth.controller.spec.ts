import { Test } from '@nestjs/testing';
import { AuthController } from '../internal/auth.controller';

import {
  RoleStorage,
  RoleStorageToken,
} from '../../authorization/client/interfaces/role-storage';
import { extractJwtPayload } from '../internal/utils/jwt.utils';
import { AuthService, AuthServiceToken, LoginCredentials } from '../client';

jest.mock('../utils/jwt.utils', () => ({
  extractJwtPayload: jest.fn(),
}));

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let roleStorage: RoleStorage;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthServiceToken,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            renewTokens: jest.fn(),
          },
        },
        {
          provide: RoleStorageToken,
          useValue: {
            clean: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthServiceToken);
    roleStorage = moduleRef.get<RoleStorage>(RoleStorageToken);
  });

  describe('register', () => {
    it('should return FinishLoginResponseDto', async () => {
      const result: LoginCredentials = {
        tokens: [],
      };
      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(
        await authController.register({
          username: '',
          password: '',
        }),
      ).toBe(result);
      expect(authService.register).toBeCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should return FinishLoginResponseDto', async () => {
      const result: LoginCredentials = {
        tokens: [],
      };
      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(
        await authController.login({
          username: '',
          password: '',
        }),
      ).toBe(result);
      expect(authService.login).toBeCalledTimes(1);
    });
  });

  describe('renewTokens', () => {
    it('should return FinishLoginResponseDto', async () => {
      const result: LoginCredentials = {
        tokens: [],
      };
      jest.spyOn(authService, 'renewTokens').mockResolvedValue(result);

      expect(
        await authController.renewAccessToken({
          refreshToken: 'refreshToken',
        }),
      ).toBe(result);
      expect(authService.renewTokens).toBeCalledWith('refreshToken');
      expect(authService.renewTokens).toBeCalledTimes(1);
    });
  });

  describe('logout', () => {
    it('should success', async () => {
      jest.spyOn(roleStorage, 'clean').mockResolvedValue();
      (extractJwtPayload as jest.Mock).mockReturnValue({});

      expect(
        await authController.logout({ refreshToken: 'refreshToken' }),
      ).toBe(undefined);
      expect(roleStorage.clean).toBeCalledTimes(1);
    });

    it('should success without clean storage', async () => {
      jest.spyOn(roleStorage, 'clean').mockResolvedValue();
      (extractJwtPayload as jest.Mock).mockReturnValue(null);

      expect(
        await authController.logout({ refreshToken: 'refreshToken' }),
      ).toBe(undefined);
      expect(roleStorage.clean).toBeCalledTimes(0);
    });
  });
});
