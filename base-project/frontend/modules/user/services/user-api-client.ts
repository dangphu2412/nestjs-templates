import { GetManyParams, Page } from '@/modules/shared/clients/list.api';
import { ApiClient } from '@/modules/shared/services';
import {
  CreateUsersDto,
  ExtractNewEmailsDto,
  PatchUserRolesPayload,
  User,
  UserManagementView,
  UserRolesView
} from '../models/user.type';
import FormData from 'form-data';
import { CreateUserType } from '@/modules/user/constants/admin-management.constants';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return ApiClient.get<User, unknown>('/users/me');
  },
  getMany(params: GetManyParams): Promise<Page<UserManagementView>> {
    return ApiClient.get<Page<UserManagementView>, unknown>('/users', {
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  },
  getUserRoles(userId: string): Promise<UserRolesView> {
    return ApiClient.get<UserRolesView, unknown>(`/users/${userId}/roles`);
  },
  updateUserRoles({ userId, roleIds }: PatchUserRolesPayload): Promise<void> {
    return ApiClient.patch<void, PatchUserRolesPayload>(
      `/users/${userId}/roles`,
      {
        userId,
        roleIds
      }
    );
  },
  toggleActive(userId: string): Promise<void> {
    return ApiClient.patch<void, unknown>(`/users/${userId}/active`);
  },
  createUser(createUserDto: CreateUsersDto): Promise<void> {
    if (
      createUserDto.attachment &&
      CreateUserType.EXCEL === createUserDto.createUserType
    ) {
      const attachmentForm = new FormData();

      attachmentForm.append('file', createUserDto.attachment);
      attachmentForm.append('createUserType', createUserDto.createUserType);
      attachmentForm.append('fileType', createUserDto.attachment.type);
      attachmentForm.append('processSheetName', createUserDto.processSheetName);

      return ApiClient.post<void, FormData>('/users/upload', attachmentForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }

    return ApiClient.post<void, CreateUsersDto>('/users', createUserDto);
  },
  extractNewEmails(
    extractNewEmailsDto: ExtractNewEmailsDto
  ): Promise<string[]> {
    return ApiClient.get<string[], ExtractNewEmailsDto>(
      '/users/extract-new-values',
      {
        params: { value: extractNewEmailsDto.value.join(',') }
      }
    );
  }
};
