import { AxiosError } from 'axios';

export const ClientErrorCode = {
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  MAINTENANCE: 'MAINTENANCE',
  GOT_ISSUE: 'GOT_ISSUE',
  UN_HANDLE_ERROR_CLIENT: 'UN_HANDLE_ERROR_CLIENT',
  INCORRECT_USERNAME_OR_PASSWORD: 'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
  LOGOUT_REQUIRED: 'AUTH__LOGOUT_REQUIRED',
  INVALID_TOKEN_FORMAT: 'AUTH__INVALID_TOKEN_FORMAT',
  USER_EMAIL_EXISTED: 'USER__EMAIL_EXISTED',
  NOT_FOUND_USER: 'USER__NOT_FOUND'
};

export const ErrorMessageManager = new Map([
  [
    `${ClientErrorCode.INCORRECT_USERNAME_OR_PASSWORD}`,
    'Username or password is incorrect'
  ],
  [`${ClientErrorCode.USER_EMAIL_EXISTED}`, 'User emails existed'],
  [`${ClientErrorCode.NOT_FOUND_USER}`, 'User not found to execute action'],
  [`${ClientErrorCode.MAINTENANCE}`, 'System is maintenance'],
  [`${ClientErrorCode.GOT_ISSUE}`, 'System is getting some issue'],
  [`${ClientErrorCode.UNAUTHORIZED}`, ''],
  [`${ClientErrorCode.FORBIDDEN}`, 'You cannot access this resource'],
  [
    `${ClientErrorCode.LOGOUT_REQUIRED}`,
    'Your session has been expired. You need to log out now'
  ],
  [`${AxiosError.ERR_NETWORK}`, 'There is a network error'],
  [`${AxiosError.ECONNABORTED}`, 'Connection aborted']
]);
