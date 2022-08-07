import { ApiClient } from '../../shared/api/api-client';
import { User } from '../models/user.type';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return ApiClient.get<User, unknown>('/users/me');
  },
  getMany(): Promise<User[]> {
    return Promise.resolve([
      {
        id: '1',
        username: 'fus dep trai',
        email: 'email@gmail.com',
        status: 'DED'
      }
    ]);
  }
};
