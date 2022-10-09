import '../styles/globals.scss';
import '../styles/typography.module.scss';
// eslint-disable-next-line prettier/prettier
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import { UserProvider } from '@modules/user/contexts/UserContext/user.provider';
import { AppLayout } from '@modules/shared/layouts/AdminLayout/AppLayout';
import { GoogleOAuthProvider } from '@modules/auth/providers/o-auth.provider';
import { GOOGLE_CLIENT_ID } from '@modules/shared/constants/env.constants';
import { AuthGuard } from '@modules/auth/components/AuthenticatedGuard/AuthenticatedGuard.component';
import { store } from '../config/store';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#f8f9fa'
      }
    })
  }
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
  const renderLayout =
    Component.getLayout ?? (page => <AppLayout>{page}</AppLayout>);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <AuthGuard authRoutes={['/auth/login']} fallbackRoute="/">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <UserProvider>
                  {renderLayout(<Component {...pageProps} />)}
                </UserProvider>
              </GoogleOAuthProvider>
            </AuthGuard>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
