import { FinishLoginResponseDto } from '../entities/dtos/finish-login-response.dto';
import { BasicLoginRequestDto } from '../entities/dtos/basic-login-request.dto';
import { BasicRegisterRequestDto } from '../entities/dtos/basic-register-request.dto';

export const AuthServiceToken = 'AuthServiceToken';

export interface AuthService {
  register(
    basicRegisterRequestDto: BasicRegisterRequestDto,
  ): Promise<FinishLoginResponseDto>;
  login(
    basicLoginRequestDto: BasicLoginRequestDto,
  ): Promise<FinishLoginResponseDto>;
  renewTokens(refreshToken: string): Promise<FinishLoginResponseDto>;
}
