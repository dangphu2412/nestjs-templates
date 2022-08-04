import { TokenGenerator } from './client/token-generator';
import { TokenDto } from './entities/dtos/finish-login-response.dto';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './entities/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenGeneratorImpl implements TokenGenerator {
  private readonly accessTokenExpiration: string;
  private readonly refreshTokenExpiration: string;

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.accessTokenExpiration = configService.get<string>(
      'ACCESS_TOKEN_EXPIRATION',
      '1m',
    );
    this.refreshTokenExpiration = configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
      '1h',
    );
  }

  generate(userId: string): Promise<TokenDto[]>;
  generate(userId: string, providedRefreshToken: string): Promise<TokenDto[]>;
  async generate(
    userId: string,
    providedRefreshToken?: string,
  ): Promise<TokenDto[]> {
    const jwtPayload: JwtPayload = {
      sub: userId,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: this.accessTokenExpiration,
    });
    let refreshToken = providedRefreshToken;

    if (!providedRefreshToken) {
      refreshToken = await this.jwtService.signAsync(jwtPayload, {
        expiresIn: this.refreshTokenExpiration,
      });
    }

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
