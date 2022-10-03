import { ApiClient } from '../../shared/services/api-client';
import { User } from '../models/user.type';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return ApiClient.get<User, unknown>('/users/me');
  }
};
