import { generateSystemException } from './exception-generator';

export const SystemExceptionClientCode = {
  MAINTENANCE: generateSystemException('MAINTENANCE'),
  GATEWAY_CANNOT_HANDLE: generateSystemException('GATEWAY_CANNOT_HANDLE'),
  GOT_ISSUE: generateSystemException('GOT_ISSUE'),
  SERVICE_GOT_ISSUE: generateSystemException('SERVICE_GOT_ISSUE'),
  UNAUTHORIZED: generateSystemException('SERVICE_UNAUTHORIZED'),
};
