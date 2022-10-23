import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
  AuthCredentials,
  LoginGoogleDto,
  MyClaims,
} from '../../proto/auth.grpc';
import { TokenDto } from '../dtos/token.dto';

export const AuthenticatorToken =
  'AuthenticatorToken' + randomStringGenerator();

export interface Authenticator {
  verify(dto: LoginGoogleDto): Promise<AuthCredentials>;
  verifyToken(token: TokenDto): Promise<MyClaims>;
}
