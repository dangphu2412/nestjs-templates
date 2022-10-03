import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleConfig } from './module-config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, ModuleConfig],
  exports: [ConfigService, ModuleConfig],
})
export class SharedModule {}
