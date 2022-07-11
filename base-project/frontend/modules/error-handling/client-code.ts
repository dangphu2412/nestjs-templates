export const ClientCodeManager = new Map([
  [
    'CLIENT_AUTH__INCORRECT_USERNAME_OR_PASSWORD',
    'Username or password is incorrect'
  ],
  ['MAINTENANCE', 'System is maintenance'],
  ['GOT_ISSUE', 'System is getting some issue']
]);

export const ClientErrorCode = {
  UNAUTHORIZED: '401',
  INCORRECT_USERNAME_OR_PASSWORD: 'CLIENT_AUTH__INCORRECT_USERNAME_OR_PASSWORD',
  MAINTENANCE: 'MAINTENANCE',
  GOT_ISSUE: 'GOT_ISSUE'
};
