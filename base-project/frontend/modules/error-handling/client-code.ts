export const ClientErrorCode = {
  UNAUTHORIZED: '401',
  INCORRECT_USERNAME_OR_PASSWORD: 'CLIENT_AUTH__INCORRECT_USERNAME_OR_PASSWORD',
  MAINTENANCE: 'MAINTENANCE',
  GOT_ISSUE: 'GOT_ISSUE',
  LOGOUT_REQUIRED: 'CLIENT_LOGOUT_REQUIRED',
  INVALID_TOKEN_FORMAT: 'CLIENT_INVALID_TOKEN_FORMAT'
};

export const ClientCodeManager = new Map([
  [
    `${ClientErrorCode.INCORRECT_USERNAME_OR_PASSWORD}`,
    'Username or password is incorrect'
  ],
  [`${ClientErrorCode.MAINTENANCE}`, 'System is maintenance'],
  [`${ClientErrorCode.GOT_ISSUE}`, 'System is getting some issue'],
  [`${ClientErrorCode.UNAUTHORIZED}`, ''],
  [
    `${ClientErrorCode.LOGOUT_REQUIRED}`,
    'Your session has been expired. You need to log out now'
  ]
]);
