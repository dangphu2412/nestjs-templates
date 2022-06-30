import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceToken } from './client/auth.service';
import { AuthServiceImpl } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [UserModule, AuthorizationModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServiceToken,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
