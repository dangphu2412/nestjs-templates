import { TokenDto } from '../entities/dtos/finish-login-response.dto';

export const TokenGeneratorToken = 'TokenGeneratorToken';

export interface TokenGenerator {
  generate(userId: string): Promise<TokenDto[]>;
  generate(userId: string, providedRefreshToken: string): Promise<TokenDto[]>;
}
