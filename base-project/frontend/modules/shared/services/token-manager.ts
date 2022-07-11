import { AuthApiClient, Tokens } from '../../auth/services/auth-api-client';
import { BrowserStorage, registerBrowserStorage } from './browser-storage';
import { ITokenManager } from './client/token-manager.interface';

let isProcessing = false;
let tokens: Tokens | undefined;

function handlePendingRenewTokenCall() {
  return new Promise<void>((resolve, reject) => {
    let retries = 3;

    const timer = setInterval(() => {
      if (retries === 0) {
        clearInterval(timer);
        reject(new Error('Cannot refresh tokens'));
        return;
      }
      if (tokens) {
        clearInterval(timer);
        registerBrowserStorage();

        tokens.tokens.forEach(token => {
          BrowserStorage.set(token.name, token.value);
        });

        resolve();
      }
      retries -= 1;
    }, 400);
  });
}

export const TokenManager: ITokenManager = {
  refresh(): void {
    registerBrowserStorage();
    BrowserStorage.remove('accessToken');
    BrowserStorage.remove('refreshToken');
  },
  async renew(): Promise<void> {
    if (!isProcessing) {
      isProcessing = true;
      tokens = await AuthApiClient.renewTokens();
      tokens = undefined;
    }

    if (isProcessing && !tokens) {
      await handlePendingRenewTokenCall();
    }
  }
};
