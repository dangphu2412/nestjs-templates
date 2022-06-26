import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceToken } from './client/auth.service';
import { AuthServiceImpl } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    UserModule,
    AuthorizationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: AuthServiceToken,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthenticationModule {}
