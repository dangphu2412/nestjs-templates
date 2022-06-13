import { Authenticator } from './client/auth.strategy';

export class AuthManager {
  public authenticate(authenticator: Authenticator) {
    return function (req, reply) {
      if (!authenticatorToRegister[authenticator]) {
        throw new Error(`There is no registered for authenticator type ${authenticator}`);
      }
    }
  }
}