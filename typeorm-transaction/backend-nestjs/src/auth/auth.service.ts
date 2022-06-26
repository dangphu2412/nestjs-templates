import { AuthService } from './client/auth.service';
import {
  FinishLoginResponseDto,
  TokenDto,
} from './entities/dtos/finish-login-response.dto';
import { BasicRegisterRequestDto } from './entities/dtos/basic-register-request.dto';
import { BasicLoginRequestDto } from './entities/dtos/basic-login-request.dto';
import { UserService, UserServiceToken } from '../user/client/user.service';
import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthExceptionClientCode } from '../exception/exception-client-code.constant';

export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    basicRegisterRequestDto: BasicRegisterRequestDto,
  ): Promise<FinishLoginResponseDto> {
    const user = await this.userService.findByUsername(
      basicRegisterRequestDto.username,
    );

    if (user) {
      throw new UnprocessableEntityException(
        AuthExceptionClientCode.DUPLICATED_USERNAME,
      );
    }

    const userId: string = await this.userService.create({
      username: basicRegisterRequestDto.username,
      rawPassword: basicRegisterRequestDto.password,
    });

    return {
      tokens: await this.generateTokens(userId),
    };
  }

  async login(
    basicLoginRequestDto: BasicLoginRequestDto,
  ): Promise<FinishLoginResponseDto> {
    const user = await this.userService.findByUsername(
      basicLoginRequestDto.username,
    );

    // TODO: Check password
    if (!user) {
      throw new UnprocessableEntityException(
        AuthExceptionClientCode.INCORRECT_USERNAME_OR_PASSWORD,
      );
    }

    return {
      tokens: await this.generateTokens(user.id),
    };
  }

  // TODO: Separate into new service to handle token for Single responsibility
  private async generateTokens(userId: string): Promise<TokenDto[]> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          expiresIn: '7d',
        },
      ),
    ]);
    return [
      {
        name: 'accessToken',
        type: 'Bearer ',
        value: accessToken,
      },
      {
        name: 'refreshToken',
        type: 'Bearer ',
        value: refreshToken,
      },
    ];
  }
}
