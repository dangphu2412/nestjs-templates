import { ApiClient } from '../../shared/api/api-client';
import { User } from '../models/user.type';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return ApiClient.get<User, unknown>('/users/me');
  },
  getMany(): Promise<User[]> {
    return ApiClient.get<User[], unknown>('/users', {
      params: {
        page: 1,
        size: 10
      }
    });
  },
  toggleActive(userId: string): Promise<void> {
    return ApiClient.patch<void, unknown>(`/users/${userId}/active`);
  }
};
