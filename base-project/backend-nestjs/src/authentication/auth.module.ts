import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceToken } from './client/auth.service';
import { AuthServiceImpl } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenGeneratorToken } from './client/token-generator';
import { TokenGeneratorImpl } from './token-generator';
import { ModuleConfig } from '../shared/services/module-config';

@Module({
  imports: [
    UserModule,
    AuthorizationModule,
    JwtModule.registerAsync({
      useFactory: (moduleConfigService: ModuleConfig) =>
        moduleConfigService.getJwtConfig(),
      inject: [ModuleConfig],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: AuthServiceToken,
      useClass: AuthServiceImpl,
    },
    {
      provide: TokenGeneratorToken,
      useClass: TokenGeneratorImpl,
    },
  ],
})
export class AuthModule {}
