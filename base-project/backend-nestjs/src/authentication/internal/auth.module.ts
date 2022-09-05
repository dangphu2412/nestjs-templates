import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceImpl } from './auth.service';
import { UserModule } from '../../user/internal/user.module';
import { AuthorizationModule } from '../../authorization/internal/authorization.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenGeneratorImpl } from './token-generator';
import { ModuleConfig } from '../../shared/services/module-config';
import { AuthServiceToken, TokenGeneratorToken } from '../client';

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
