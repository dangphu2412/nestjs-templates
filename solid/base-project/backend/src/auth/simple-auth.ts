import { Authenticator } from './client/auth.strategy';

export interface SimpleAuthRequest {
  username: string;
  password: string;
}

export interface SimpleAuthResponse {
  accessToken: string;
}

export class SimpleAuthenticator
  implements Authenticator<SimpleAuthRequest, SimpleAuthResponse>
{
  async doAuth(request: SimpleAuthRequest) {
    const user = UserLookup.findByUsername(request.username);
    if (!user) {
      throw new Error('No user found');
    }
    if (bcrypt.compare(user.password, request.password)) {
      throw new Error('Incorrect username or password');
    }
    return await JwtService.sign({ userId: user.id });
  }
}
