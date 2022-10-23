import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AUTH_PACKAGE_NAME } from './proto/auth.grpc';
import { AuthenticationStrategy } from './strategies/auth.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'auth',
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthenticationStrategy],
})
export class AuthModule {}
