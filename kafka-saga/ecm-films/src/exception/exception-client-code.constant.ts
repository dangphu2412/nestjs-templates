import { generateFilmsException } from './service-exception-generator';

export const FilmsGrpcExceptionCode = {
  MAINTENANCE: generateFilmsException('MAINTENANCE'),
  GOT_ISSUE: generateFilmsException('GOT_ISSUE'),
};
