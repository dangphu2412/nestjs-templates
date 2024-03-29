import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthenticatorImpl } from './services/authenticator';
import { AuthenticatorToken } from './clients';
import { GoogleOauth2ClientProvider } from './services/google-oauth2-client.provider';
import { UserModule } from '../user/internal/user.module';
import { JwtService } from './services/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthenticatorToken,
      useClass: AuthenticatorImpl,
    },
    GoogleOauth2ClientProvider,
    JwtService,
  ],
})
export class AuthModule {}
