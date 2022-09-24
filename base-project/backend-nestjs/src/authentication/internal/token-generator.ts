import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, TokenDto, TokenGenerator } from '../client';

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
      '1h',
    );
    this.refreshTokenExpiration = configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
      '7d',
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
