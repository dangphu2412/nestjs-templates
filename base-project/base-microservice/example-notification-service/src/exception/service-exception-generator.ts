import { createServiceExceptionGenerator } from './exception-generator.factory';

export const generateNewsException =
  createServiceExceptionGenerator('NOTIFICATIONS_');
