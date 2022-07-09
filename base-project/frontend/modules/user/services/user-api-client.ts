import { ApiClient } from '../../shared/api/api-client';
import { User } from '../models/user.type';

export const UserApiClient = {
  getMyProfile() {
    return ApiClient.get<User, unknown>('/users/me');
  }
};
