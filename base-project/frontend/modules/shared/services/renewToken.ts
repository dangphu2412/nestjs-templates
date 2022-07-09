import { AuthApiClient, Tokens } from '../../auth/services/auth-api-client';
import { BrowserStorage, registerBrowserStorage } from './browser-storage';

let isProcessing = false;
let tokens: Tokens | undefined;

export const RenewToken = {
  // TODO: Fix this renew function
  async renew(): Promise<void> {
    registerBrowserStorage();

    if (!isProcessing && tokens) {
      tokens.tokens.forEach(token => {
        BrowserStorage.set(token.name, token.value);
      });
      return;
    }

    isProcessing = true;
    tokens = await AuthApiClient.renewTokens();

    await RenewToken.renew();
  }
};
