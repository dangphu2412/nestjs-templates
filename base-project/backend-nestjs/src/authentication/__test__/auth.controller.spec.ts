import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService, AuthServiceToken } from '../client/auth.service';
import {
  RoleStorage,
  RoleStorageToken,
} from '../../authorization/client/role-storage';
import { FinishLoginResponseDto } from '../entities/dtos/finish-login-response.dto';

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
      const result: FinishLoginResponseDto = {
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
      const result: FinishLoginResponseDto = {
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
      const result: FinishLoginResponseDto = {
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

      expect(await authController.logout('userId')).toBe(undefined);
      expect(roleStorage.clean).toBeCalledTimes(1);
    });
  });
});
