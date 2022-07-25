import '../styles/globals.css';
// eslint-disable-next-line prettier/prettier
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import { store } from '../config/store';
import { AuthenticatedGuard } from '../modules/auth/components/AuthenticatedGuard/AuthenticatedGuard.component';
import { UserProvider } from '../modules/user/providers/user-provider';
import { AdminLayout } from '../modules/shared/layouts/AdminLayout/AdminLayout';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
  const renderLayout =
    Component.getLayout ?? (page => <AdminLayout>{page}</AdminLayout>);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <UserProvider>
              {renderLayout(<Component {...pageProps} />)}
            </UserProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
