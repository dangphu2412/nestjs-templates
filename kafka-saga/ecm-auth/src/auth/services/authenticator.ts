import { Authenticator, JwtPayload } from '../clients';
import { AuthCredentials, LoginGoogleDto } from '../proto/auth.grpc';
import { GoogleOauth2ClientToken } from './google-oauth2-client.provider';
import { Inject } from '@nestjs/common';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { AppConfig } from '../../shared/app-config';
import { AuthGrpcExceptionCode } from '../../exception/exception-client-code.constant';
import { CreateUserDto, UserService, UserServiceToken } from '../../user';
import { InternalRpcException } from '../../exception/rpc/internal-rpc.exception';
import { InvalidArgumentRpcException } from '../../exception/rpc/invalid-argument-rpc.exception';
import { JwtService } from './jwt.service';

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
    const loginTicket = await this.getLoginTicket(dto.idToken);

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

    const accessToken = await this.jwtService.sign(jwtPayload);

    return {
      tokens: [
        {
          name: 'accessToken',
          value: accessToken,
        },
      ],
    };
  }

  private async getLoginTicket(idToken: string): Promise<LoginTicket> {
    try {
      return await this.googleOauth2Client.verifyIdToken({
        idToken,
        audience: this.clientId,
      });
    } catch {
      throw new InvalidArgumentRpcException(
        AuthGrpcExceptionCode.INVALID_ID_TOKEN,
      );
    }
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
