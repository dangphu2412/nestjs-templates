import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    AuthorizationModule,
    SharedModule,
  ],
})
export class AppModule {}
