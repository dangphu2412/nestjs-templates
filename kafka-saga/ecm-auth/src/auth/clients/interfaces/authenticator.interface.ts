import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AuthCredentials, LoginGoogleDto } from '../../proto/auth.grpc';

export const AuthenticatorToken =
  'AuthenticatorToken' + randomStringGenerator();

export interface Authenticator {
  verify(dto: LoginGoogleDto): Promise<AuthCredentials>;
}
