import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
import {
  AuthService,
  AuthServiceToken,
  BasicLoginDto,
  BasicRegisterDto,
  RenewTokensDto,
} from '../client';
import { RoleStorage, RoleStorageToken } from '../../authorization';
import { extractJwtPayload } from './utils/jwt.utils';
import { ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  public register(@Body() basicRegisterRequestDto: BasicRegisterDto) {
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
  public login(@Body() basicLoginRequestDto: BasicLoginDto) {
    return this.authService.login(basicLoginRequestDto);
  }

  @Post('tokens/renew')
  public renewAccessToken(@Body() renewTokensRequestDto: RenewTokensDto) {
    return this.authService.renewTokens(renewTokensRequestDto.refreshToken);
  }

  @ApiNoContentResponse()
  @Delete('logout')
  public logout(@Body() renewTokensRequestDto: RenewTokensDto) {
    const jwtPayload = extractJwtPayload(renewTokensRequestDto.refreshToken);
    if (!jwtPayload) {
      return;
    }
    return this.roleStorage.clean(jwtPayload.sub);
  }
}
