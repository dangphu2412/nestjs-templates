import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  AuthCredentials,
  AuthServiceController,
  AuthServiceControllerMethods,
  Empty,
  MyClaims,
  MyProfile,
} from './proto/auth.grpc';
import {
  Authenticator,
  AuthenticatorToken,
  LoginGoogleDto,
  TokenDto,
} from './clients';
import { Metadata } from '@grpc/grpc-js';
import { from, map, Observable } from 'rxjs';
import { UserService, UserServiceToken } from '../user';
import { UserMapper } from '../user/internal/mappers/user.mapper';
import { UserMetadataPipe } from './pipes/user-metadata.pipe';

@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    @Inject(AuthenticatorToken)
    private readonly authenticator: Authenticator,
    @Inject(UserServiceToken)
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @UsePipes(ValidationPipe)
  loginByGoogle(loginGoogleDto: LoginGoogleDto): Promise<AuthCredentials> {
    return this.authenticator.verify(loginGoogleDto);
  }

  @UsePipes(UserMetadataPipe)
  getMyProfile(_: Empty, metadata: Metadata): Observable<MyProfile> {
    const userId = metadata.get('userId')[0];

    return from(
      this.userService.findOne({
        where: {
          id: userId,
        },
      }),
    ).pipe(map(this.userMapper.toMyProfile));
  }

  @UsePipes(ValidationPipe)
  verifyToken(token: TokenDto): Promise<MyClaims> {
    return this.authenticator.verifyToken(token);
  }
}
