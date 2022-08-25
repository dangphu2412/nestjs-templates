import { GetManyParams } from '@modules/shared/clients/list.api';
import { ApiClient } from '../../shared/services/api-client';
import { User } from '../models/user.type';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return ApiClient.get<User, unknown>('/users/me');
  },
  getMany(params: GetManyParams): Promise<User[]> {
    return ApiClient.get<User[], unknown>('/users', {
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  },
  toggleActive(userId: string): Promise<void> {
    return ApiClient.patch<void, unknown>(`/users/${userId}/active`);
  }
};
