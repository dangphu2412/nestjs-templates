import { Test } from '@nestjs/testing';
import { UserController } from '../internal/user.controller';
import { MyProfile } from '../../authentication';
import { UserManagementView, UserService, UserServiceToken } from '../client';

describe('AuthController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserServiceToken,
          useValue: {
            find: jest.fn(),
            getMyProfile: jest.fn(),
            toggleUserIsActive: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserServiceToken);
  });

  describe('getMyProfile', () => {
    it('should return MyProfile', async () => {
      const result: MyProfile = {
        username: 'fusdeptrai',
        id: '1',
      };
      jest.spyOn(userService, 'getMyProfile').mockResolvedValue(result);

      expect(
        await userController.getMyProfile({
          sub: '1',
        }),
      ).toBe(result);
    });
  });

  describe('find', () => {
    it('should return users', async () => {
      const result: UserManagementView = [
        {
          username: 'fusdeptrai',
          id: '1',
          email: 'email',
          deletedAt: new Date(),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      jest.spyOn(userService, 'find').mockResolvedValue(result);

      expect(
        await userController.find({
          page: 1,
          activeDateRange: {
            toDate: new Date(),
            fromDate: new Date(),
          },
          size: 10,
        }),
      ).toBe(result);
    });
  });

  describe('toggleIsActive', () => {
    it('should return users', async () => {
      await userController.toggleIsActive('id');
      expect(userService.toggleUserIsActive).toBeCalledTimes(1);
    });
  });
});
