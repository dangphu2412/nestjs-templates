import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService, AuthServiceToken } from './client/auth.service';
import { BasicRegisterRequestDto } from './entities/dtos/basic-register-request.dto';
import { BasicLoginRequestDto } from './entities/dtos/basic-login-request.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    @Inject(AuthServiceToken)
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  public register(@Body() basicRegisterRequestDto: BasicRegisterRequestDto) {
    return this.authService.register(basicRegisterRequestDto);
  }

  @Post('login')
  public login(@Body() basicLoginRequestDto: BasicLoginRequestDto) {
    return this.authService.login(basicLoginRequestDto);
  }
}
