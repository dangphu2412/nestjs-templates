import { Authenticator, JwtPayload } from '../clients';
import { AuthCredentials, LoginGoogleDto } from '../proto/auth.grpc';
import { GoogleOauth2ClientToken } from './google-oauth2-client';
import { Inject } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AppConfig } from '../../shared/app-config';
import { AuthGrpcExceptionCode } from '../../exception/exception-client-code.constant';
import { CreateUserDto, UserService, UserServiceToken } from '../../user';
import { JwtService } from '@nestjs/jwt';
import { InternalRpcException } from '../../exception/rpc/internal-rpc.exception';

export class AuthenticatorImpl implements Authenticator {
  private readonly clientId: string;

  constructor(
    @Inject(GoogleOauth2ClientToken)
    private readonly googleOauth2Client: OAuth2Client,
    @Inject(UserServiceToken)
    private readonly userService: UserService,
    appConfig: AppConfig,
    private readonly jwtService: JwtService,
  ) {
    this.clientId = appConfig.getGoogleOAuthClientId();
  }

  async verify(dto: LoginGoogleDto): Promise<AuthCredentials> {
    const loginTicket = await this.googleOauth2Client.verifyIdToken({
      idToken: dto.idToken,
      audience: this.clientId,
    });

    const tokenPayload: TokenPayload = loginTicket.getPayload();

    this.validateScopes(tokenPayload);

    let userId: string;

    try {
      const { id } = await this.userService.findOne({
        where: {
          email: tokenPayload.email,
        },
      });

      userId = id;
    } catch {
      const newUser = new CreateUserDto();

      newUser.email = tokenPayload.email;
      newUser.fullName = tokenPayload.family_name;

      userId = await this.userService.createOne(newUser);
    }

    const jwtPayload: JwtPayload = {
      sub: userId,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      tokens: [
        {
          name: 'accessToken',
          value: accessToken,
        },
      ],
    };
  }

  private validateScopes(tokenPayload: TokenPayload) {
    if (
      !tokenPayload.email ||
      !tokenPayload.family_name ||
      !tokenPayload.picture
    ) {
      throw new InternalRpcException(
        AuthGrpcExceptionCode.MISSING_AUTH_SCOPE_PROVIDED,
      );
    }
  }
}
