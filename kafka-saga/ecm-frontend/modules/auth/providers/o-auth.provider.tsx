import React, { createContext, useContext } from 'react';
import { useLoadGsiScript } from '@modules/auth/hooks/useLoadGsiScript';

interface GoogleOAuthContextProps {
  clientId: string;
  isOAuthClientLoaded: boolean;
}

export interface GoogleOAuthProviderProps {
  clientId: string;
  children: React.ReactNode;
}

const GoogleOAuthContext = createContext<GoogleOAuthContextProps>(null!);

export function useGoogleOAuth() {
  const context = useContext(GoogleOAuthContext);

  if (!context) {
    throw new Error(
      'Google OAuth components must be used within GoogleOAuthProvider'
    );
  }

  return context;
}

export function GoogleOAuthProvider({
  clientId,
  children
}: GoogleOAuthProviderProps): React.ReactElement {
  const { isOAuthClientLoaded } = useLoadGsiScript();

  const oAuthContextProps: GoogleOAuthContextProps = React.useMemo(() => {
    return {
      clientId,
      isOAuthClientLoaded
    };
  }, [clientId, isOAuthClientLoaded]);

  return (
    <GoogleOAuthContext.Provider value={oAuthContextProps}>
      {children}
    </GoogleOAuthContext.Provider>
  );
}
