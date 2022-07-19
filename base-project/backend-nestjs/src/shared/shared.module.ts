import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptService } from './bcrypt.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
  ],
  providers: [BcryptService, ConfigService],
  exports: [BcryptService, ConfigService],
})
export class SharedModule {}
