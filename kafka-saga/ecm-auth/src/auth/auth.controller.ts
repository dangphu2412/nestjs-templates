import { Inject } from '@nestjs/common';
import {
  AuthCredentials,
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginGoogleDto,
} from './proto/auth.grpc';
import { Authenticator, AuthenticatorToken } from './clients';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    @Inject(AuthenticatorToken)
    private readonly authenticator: Authenticator,
  ) {}

  loginByGoogle(loginGoogleDto: LoginGoogleDto): Promise<AuthCredentials> {
    return this.authenticator.verify(loginGoogleDto);
  }
}
