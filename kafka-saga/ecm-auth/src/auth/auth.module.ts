import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthenticatorImpl } from './services/authenticator';
import { AuthenticatorToken } from './clients';
import { GoogleOauth2Client } from './services/google-oauth2-client';
import { UserModule } from '../user/internal/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthenticatorToken,
      useClass: AuthenticatorImpl,
    },
    GoogleOauth2Client,
  ],
})
export class AuthModule {}
