import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleConfig } from '../shared/services/module-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ModuleConfig],
      useFactory: (moduleConfigService: ModuleConfig) =>
        moduleConfigService.getTypeormConfig(),
    }),
  ],
})
export class DatabaseModule {}
