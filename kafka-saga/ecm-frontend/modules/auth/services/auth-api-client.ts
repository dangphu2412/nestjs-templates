import { ApiClient } from '../../shared/services/api-client';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';

export interface BasicLoginRequest {
  username: string;
  password: string;
}

export interface LoginGoogleRequest {
  idToken: string;
  loginType: LoginType.GOOGLE;
}

export interface Tokens {
  tokens: { name: string; type: string; value: string }[];
}

export interface RenewTokensRequest {
  refreshToken: string;
}

export enum LoginType {
  BASIC,
  GOOGLE
}

function login(body: BasicLoginRequest | LoginGoogleRequest): Promise<Tokens> {
  if ((body as LoginGoogleRequest).loginType === LoginType.GOOGLE) {
    return ApiClient.post<Tokens, LoginGoogleRequest>(
      'api/auth/login/google',
      body as LoginGoogleRequest
    );
  }

  return ApiClient.post<Tokens, BasicLoginRequest>(
    'api/auth/login',
    body as BasicLoginRequest
  );
}

export const AuthApiClient = {
  login,
  renewTokens() {
    registerBrowserStorage();
    const refreshToken = BrowserStorage.get('refreshToken') ?? '';
    return ApiClient.post<Tokens, RenewTokensRequest>('/auth/tokens/renew', {
      refreshToken
    });
  },
  logout() {
    registerBrowserStorage();
    const refreshToken = BrowserStorage.get('refreshToken') ?? '';
    return ApiClient.delete<void, RenewTokensRequest>('/auth/logout', {
      data: {
        refreshToken
      }
    });
  }
};
