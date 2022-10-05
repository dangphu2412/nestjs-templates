import React, { useEffect, useRef } from 'react';
import {
  GsiButtonConfiguration,
  IdConfiguration,
  OAuthCredentialResponse
} from '@modules/auth/clients';
import { useGoogleOAuth } from '@modules/auth/providers/o-auth.provider';

type GoogleLoginProps = {
  onSuccess(oAuthLoginEdCredential: OAuthCredentialResponse): void;
  onError?(error: Error): void;
} & Omit<IdConfiguration, 'client_id' | 'callback'> &
  GsiButtonConfiguration;

export function GoogleLoginButton({
  onSuccess,
  onError,
  type = 'standard',
  theme = 'outline',
  size = 'large',
  text,
  shape,
  logoAlignment,
  width,
  locale,
  ...props
}: GoogleLoginProps): React.ReactElement {
  const { clientId, isOAuthClientLoaded } = useGoogleOAuth();
  const btnContainerRef = useRef<HTMLDivElement>(null);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    if (!isOAuthClientLoaded) {
      return;
    }

    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: (credentialResponse: OAuthCredentialResponse): void => {
        if (!credentialResponse.clientId || !credentialResponse.credential) {
          onErrorRef.current?.(
            new Error('Client id is invalid when initializing')
          );

          return;
        }

        onSuccessRef.current(credentialResponse);
      },
      ...props
    });

    window.google?.accounts.id.renderButton(btnContainerRef.current!, {
      type,
      theme,
      size,
      text,
      shape,
      logo_alignment: logoAlignment,
      width,
      locale
    });
  }, [
    onSuccess,
    onError,
    clientId,
    type,
    theme,
    size,
    text,
    shape,
    logoAlignment,
    width,
    locale,
    props,
    isOAuthClientLoaded
  ]);

  return <div ref={btnContainerRef} />;
}
