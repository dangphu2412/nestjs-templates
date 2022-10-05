import React from 'react';

type GsiScriptState = {
  isOAuthClientLoaded: boolean;
};

export function useLoadGsiScript(): GsiScriptState {
  const [isOAuthClientLoaded, setIsOAuthClientLoaded] = React.useState(false);

  React.useEffect(() => {
    const scriptTag = document.createElement('script');

    scriptTag.src = 'https://accounts.google.com/gsi/client';
    scriptTag.async = true;
    scriptTag.defer = true;

    scriptTag.onload = () => {
      setIsOAuthClientLoaded(true);
    };

    scriptTag.onerror = () => {
      setIsOAuthClientLoaded(false);
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return {
    isOAuthClientLoaded
  };
}
