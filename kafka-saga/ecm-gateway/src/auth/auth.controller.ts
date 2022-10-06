import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthCredentials,
  AuthServiceClient,
  LoginGoogleDto,
  MyProfile,
} from './proto/auth.grpc';
import { Observable } from 'rxjs';
import { CurrentUser, Identified } from './decorators';
import { createUserMetadata } from './factories/user-metadata.factory';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(
    @Inject(AUTH_PACKAGE_NAME)
    private authClientGrpc: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.authService =
      this.authClientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('/login/google')
  loginByGoogle(
    @Body() loginGoogleDto: LoginGoogleDto,
  ): Observable<AuthCredentials> {
    return this.authService.loginByGoogle(loginGoogleDto);
  }

  @Identified
  @Get('/me')
  getMyProfile(@CurrentUser('sub') userId: string): Observable<MyProfile> {
    const metadata = createUserMetadata(userId);

    return this.authService.getMyProfile({}, metadata);
  }
}
