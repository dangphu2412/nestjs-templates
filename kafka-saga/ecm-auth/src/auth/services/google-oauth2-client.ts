import { Provider } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AppConfig } from '../../shared/app-config';

export const GoogleOauth2ClientToken = 'GoogleOauth2ClientToken';

export const GoogleOauth2Client: Provider = {
  provide: GoogleOauth2ClientToken,
  inject: [AppConfig],
  useFactory(appConfig: AppConfig) {
    const clientId = appConfig.getGoogleOAuthClientId();

    return new OAuth2Client(clientId);
  },
};
