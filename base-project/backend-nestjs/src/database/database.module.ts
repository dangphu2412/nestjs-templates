import { Module } from '@nestjs/common';
import { DatabaseSetupFactory } from './database-setup.factory';

@Module({
  imports: [new DatabaseSetupFactory().initialize()],
})
export class DatabaseModule {}
