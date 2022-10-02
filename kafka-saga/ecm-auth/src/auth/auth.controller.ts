import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  AuthCredentials,
  AuthServiceController,
  AuthServiceControllerMethods,
} from './proto/auth.grpc';
import { Authenticator, AuthenticatorToken, LoginGoogleDto } from './clients';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    @Inject(AuthenticatorToken)
    private readonly authenticator: Authenticator,
  ) {}

  @UsePipes(ValidationPipe)
  loginByGoogle(loginGoogleDto: LoginGoogleDto): Promise<AuthCredentials> {
    console.log(typeof loginGoogleDto.idToken);
    console.log(loginGoogleDto.idToken);
    return this.authenticator.verify(loginGoogleDto);
  }
}
