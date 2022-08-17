import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { TokenDto } from '../entities/dtos/finish-login-response.dto';

export const TokenGeneratorToken = randomStringGenerator();

export interface TokenGenerator {
  generate(userId: string): Promise<TokenDto[]>;
  generate(userId: string, providedRefreshToken: string): Promise<TokenDto[]>;
}
