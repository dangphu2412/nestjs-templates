import { AuthService } from './client/auth.service';
import { FinishLoginResponseDto } from './entities/dtos/finish-login-response.dto';
import { BasicRegisterRequestDto } from './entities/dtos/basic-register-request.dto';
import { BasicLoginRequestDto } from './entities/dtos/basic-login-request.dto';
import { UserService, UserServiceToken } from '../user/client/user.service';
import {
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthExceptionClientCode } from '../exception/exception-client-code.constant';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import {
  RoleService,
  RoleServiceToken,
} from '../authorization/client/role.service';
import { BcryptService } from '../shared/bcrypt.service';
import {
  RoleStorage,
  RoleStorageToken,
} from '../authorization/client/role-storage';
import { Role } from '../authorization/entities/role.entity';
import { TokenGenerator, TokenGeneratorToken } from './client/token-generator';
import { JwtPayload } from './entities/jwt-payload';

export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: UserService,
    @Inject(RoleServiceToken)
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    @Inject(RoleStorageToken)
    private readonly roleStorage: RoleStorage,
    @Inject(TokenGeneratorToken)
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  private static toRoleKeys(roles: Role[]): Record<string, boolean> {
    return roles.reduce((roles: Record<string, boolean>, currentRole) => {
      roles[currentRole.key] = true;
      return roles;
    }, {});
  }

  @Transactional()
  async register(
    basicRegisterRequestDto: BasicRegisterRequestDto,
  ): Promise<FinishLoginResponseDto> {
    const user = await this.userService.findByUsername(
      basicRegisterRequestDto.username,
    );

    if (user) {
      throw new UnprocessableEntityException(
        AuthExceptionClientCode.DUPLICATED_USERNAME,
      );
    }

    const hashedPassword = await this.bcryptService.hash(
      basicRegisterRequestDto.password,
    );

    const [createdUser, roles] = await Promise.all([
      this.userService.create({
        username: basicRegisterRequestDto.username,
        password: hashedPassword,
      }),
      this.roleService.getNewUserRoles(),
    ]);

    await this.userService.updateRolesForUser(createdUser, roles);
    const roleKeys = AuthServiceImpl.toRoleKeys(roles);

    const [tokens] = await Promise.all([
      this.tokenGenerator.generate(createdUser.id),
      this.roleStorage.set(createdUser.id, roleKeys),
    ]);

    return {
      tokens,
    };
  }

  async login(
    basicLoginRequestDto: BasicLoginRequestDto,
  ): Promise<FinishLoginResponseDto> {
    const user = await this.userService.findByUsername(
      basicLoginRequestDto.username,
      ['roles'],
    );

    if (
      !user ||
      (await this.bcryptService.compare(
        basicLoginRequestDto.password,
        user.password,
      ))
    ) {
      throw new UnprocessableEntityException(
        AuthExceptionClientCode.INCORRECT_USERNAME_OR_PASSWORD,
      );
    }
    const roleKeys = AuthServiceImpl.toRoleKeys(user.roles);

    const [tokens] = await Promise.all([
      this.tokenGenerator.generate(user.id),
      this.roleStorage.set(user.id, roleKeys),
    ]);

    return {
      tokens,
    };
  }

  async renewTokens(refreshToken: string): Promise<FinishLoginResponseDto> {
    const { sub } = this.jwtService.decode(refreshToken);
    try {
      await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      return {
        tokens: await this.tokenGenerator.generate(sub, refreshToken),
      };
    } catch (e) {
      await this.roleStorage.clean(sub);
      throw new UnauthorizedException(AuthExceptionClientCode.LOGOUT_REQUIRED);
    }
  }
}
