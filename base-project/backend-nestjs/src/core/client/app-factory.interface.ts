import { DynamicModule } from '@nestjs/common';

export interface ModuleFactory {
  initialize(): DynamicModule;
}
