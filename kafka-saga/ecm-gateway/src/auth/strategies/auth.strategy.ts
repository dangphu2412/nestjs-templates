import {
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { loadAuthStrategy } from './auth-strategy.loader';
import { AuthStrategy } from '../clients';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  Token,
} from '../proto/auth.grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationStrategy implements AuthStrategy, OnModuleInit {
  private authService: AuthServiceClient;

  constructor(
    @Inject(AUTH_PACKAGE_NAME)
    private authClientGrpc: ClientGrpc,
  ) {
    loadAuthStrategy(AuthenticationStrategy, this);
  }

  onModuleInit(): void {
    this.authService =
      this.authClientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async validate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      headers: { authorization: accessToken },
    } = request;

    if (!accessToken) {
      return false;
    }

    const token: Token = {
      name: 'accessToken',
      value: accessToken,
    };

    request.user = await firstValueFrom(this.authService.verifyToken(token));

    return true;
  }
}
