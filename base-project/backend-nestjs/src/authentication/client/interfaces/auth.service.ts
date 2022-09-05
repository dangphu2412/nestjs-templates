import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { LoginCredentials } from '../types';
import { BasicRegisterDto, BasicLoginDto } from '../dtos';

export const AuthServiceToken = randomStringGenerator();

export interface AuthService {
  register(
    basicRegisterRequestDto: BasicRegisterDto,
  ): Promise<LoginCredentials>;

  login(basicLoginRequestDto: BasicLoginDto): Promise<LoginCredentials>;

  renewTokens(refreshToken: string): Promise<LoginCredentials>;
}
