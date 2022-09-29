import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthExceptionClientCode } from '../../exception/exception-client-code.constant';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { extractJwtPayload } from './utils/jwt.utils';
import {
  AuthService,
  BasicLoginDto,
  BasicRegisterDto,
  JwtPayload,
  LoginCredentials,
  TokenGenerator,
  TokenGeneratorToken,
} from '../client';
import {
  RoleService,
  RoleServiceToken,
  RoleStorage,
  RoleStorageToken,
} from '../../authorization';
import { UserService, UserServiceToken } from '../../user';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(UserServiceToken)
    private readonly userService: UserService,
    @Inject(RoleServiceToken)
    private readonly roleService: RoleService,
    @Inject(RoleStorageToken)
    private readonly roleStorage: RoleStorage,
    @Inject(TokenGeneratorToken)
    private readonly tokenGenerator: TokenGenerator,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Transactional()
  async register(
    basicRegisterRequestDto: BasicRegisterDto,
  ): Promise<LoginCredentials> {
    // TODO: Retrieve record of user service and throw own auth service exception code
    await this.userService.assertUsernameNotDuplicated(
      basicRegisterRequestDto.username,
    );

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

    const [tokens] = await Promise.all([
      this.tokenGenerator.generate(createdUser.id),
      this.roleStorage.set(createdUser.id, roles),
    ]);

    return {
      tokens,
    };
  }

  async login(basicLoginRequestDto: BasicLoginDto): Promise<LoginCredentials> {
    const user = await this.userService.findByUsername(
      basicLoginRequestDto.username,
      ['roles'],
    );
    const cannotLogin =
      !user ||
      (await this.bcryptService.compare(
        basicLoginRequestDto.password,
        user.password,
      ));

    if (cannotLogin) {
      throw new UnprocessableEntityException(
        AuthExceptionClientCode.INCORRECT_USERNAME_OR_PASSWORD,
      );
    }

    const [tokens] = await Promise.all([
      this.tokenGenerator.generate(user.id),
      this.roleStorage.set(user.id, user.roles),
    ]);

    return {
      tokens,
    };
  }

  async renewTokens(refreshToken: string): Promise<LoginCredentials> {
    try {
      const { sub } = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
      );

      return {
        tokens: await this.tokenGenerator.generate(sub, refreshToken),
      };
    } catch {
      const jwtPayload = extractJwtPayload(refreshToken);

      if (!jwtPayload) {
        throw new BadRequestException(
          AuthExceptionClientCode.INVALID_TOKEN_FORMAT,
        );
      }

      await this.roleStorage.clean(jwtPayload.sub);

      throw new UnauthorizedException(AuthExceptionClientCode.LOGOUT_REQUIRED);
    }
  }
}
