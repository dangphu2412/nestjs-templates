import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptService } from './bcrypt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BcryptService, ConfigService, JwtStrategy, JwtService],
  exports: [BcryptService, ConfigService, JwtService],
})
export class SharedModule {}
