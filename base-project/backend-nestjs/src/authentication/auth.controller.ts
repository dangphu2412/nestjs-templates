import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
import { AuthService, AuthServiceToken } from './client/auth.service';
import { BasicRegisterRequestDto } from './entities/dtos/basic-register-request.dto';
import { BasicLoginRequestDto } from './entities/dtos/basic-login-request.dto';
import { ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RenewTokensRequestDto } from './entities/dtos/renew-tokens-request.dto';
import { Identified } from './decorators/identified.decorator';
import { CurrentUser } from './decorators/user.decorator';
import {
  RoleStorage,
  RoleStorageToken,
} from '../authorization/client/role-storage';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    @Inject(AuthServiceToken)
    private readonly authService: AuthService,
    @Inject(RoleStorageToken)
    private readonly roleStorage: RoleStorage,
  ) {}

  @Post('register')
  @ApiResponse({
    status: 201,
  })
  public register(@Body() basicRegisterRequestDto: BasicRegisterRequestDto) {
    return this.authService.register(basicRegisterRequestDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 422,
    description: 'AUTH__INCORRECT_USERNAME_OR_PASSWORD',
  })
  public login(@Body() basicLoginRequestDto: BasicLoginRequestDto) {
    return this.authService.login(basicLoginRequestDto);
  }

  @Post('tokens/renew')
  public renewAccessToken(
    @Body() renewTokensRequestDto: RenewTokensRequestDto,
  ) {
    return this.authService.renewTokens(renewTokensRequestDto.refreshToken);
  }

  @Identified
  @Delete()
  @ApiNoContentResponse()
  public logout(@CurrentUser('sub') userId: string) {
    return this.roleStorage.clean(userId);
  }
}
