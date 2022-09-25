import { generateNewsException } from './service-exception-generator';

export const NewsGrpcExceptionCode = {
  MAINTENANCE: generateNewsException('MAINTENANCE'),
  GOT_ISSUE: generateNewsException('GOT_ISSUE'),
};
