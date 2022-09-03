import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptService } from './services/bcrypt.service';
import { ModuleConfigService } from './services/module-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [BcryptService, ConfigService, ModuleConfigService],
  exports: [BcryptService, ConfigService, ModuleConfigService],
})
export class SharedModule {}
