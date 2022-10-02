import { ApiClient } from '../../shared/services/api-client';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Tokens {
  tokens: { name: string; type: string; value: string }[];
}

export interface RenewTokensRequest {
  refreshToken: string;
}

export const AuthApiClient = {
  login(body: LoginRequest) {
    return ApiClient.post<Tokens, LoginRequest>('/auth/login', body);
  },
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
