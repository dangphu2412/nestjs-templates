import { AuthApiClient, Tokens } from '../../auth/services/auth-api-client';
import { BrowserStorage, registerBrowserStorage } from './browser-storage';
import { ITokenManager } from './client/token-manager.interface';

let renewHandler: Promise<Tokens> | undefined;

export const TokenManager: ITokenManager = {
  clean(): void {
    registerBrowserStorage();
    BrowserStorage.remove('accessToken');
    BrowserStorage.remove('refreshToken');
  },
  async renew(): Promise<void> {
    if (!renewHandler) {
      renewHandler = AuthApiClient.renewTokens();
    }

    const tokens: Tokens = await renewHandler;

    registerBrowserStorage();

    tokens.tokens.forEach(token => {
      BrowserStorage.set(token.name, token.value);
    });

    if (renewHandler) {
      renewHandler = undefined;
    }
  }
};
