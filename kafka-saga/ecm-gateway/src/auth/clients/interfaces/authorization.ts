import { ExecutionContext } from '@nestjs/common';

export interface AuthStrategy {
  validate(context: ExecutionContext): Promise<boolean>;
}
