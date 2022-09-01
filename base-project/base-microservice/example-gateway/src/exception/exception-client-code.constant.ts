import { generateSystemException } from './exception-generator';

export const SystemExceptionClientCode = {
  MAINTENANCE: generateSystemException('MAINTENANCE'),
  GOT_ISSUE: generateSystemException('GOT_ISSUE'),
  SERVICE_GOT_ISSUE: generateSystemException('SERVICE_GOT_ISSUE'),
};
