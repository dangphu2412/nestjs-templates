const PREFIX_STRATEGY = 'CLIENT_';

export function generateClientException(errorCode: string) {
  return `${PREFIX_STRATEGY}${errorCode}`;
}

export function isClientException(errorCode: string) {
  return errorCode.startsWith(PREFIX_STRATEGY);
}
