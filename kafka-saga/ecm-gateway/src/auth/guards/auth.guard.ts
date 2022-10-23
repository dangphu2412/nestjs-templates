import { Injectable } from '@nestjs/common';
import { CreateAuthGuard } from '../factories/auth-guard.factory';
import { AuthenticationStrategy } from '../strategies/auth.strategy';

@Injectable()
export class AuthGuard extends CreateAuthGuard(AuthenticationStrategy) {}
