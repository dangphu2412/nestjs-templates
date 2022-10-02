import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthCredentials,
  AuthServiceClient,
  LoginGoogleDto,
} from './proto/auth.grpc';
import { Observable } from 'rxjs';

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
    console.log(loginGoogleDto.idToken);
    console.log(typeof loginGoogleDto.idToken);
    return this.authService.loginByGoogle(loginGoogleDto);
  }
}
