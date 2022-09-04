import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptService } from './services/bcrypt.service';
import { ModuleConfig } from './services/module-config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [BcryptService, ModuleConfig, ConfigService],
  exports: [BcryptService, ModuleConfig],
})
export class SharedModule {}
