import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import store from '../config/store.config';
import { Provider } from 'react-redux';
import {AuthenticatedGuard} from "../modules/auth/components/AuthenticatedGuard.component";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Hydrate state={pageProps.dehydratedState}>
            <AuthenticatedGuard
                publicRoutes={['/login']}
                defaultRoute={'/'}
            >
                <Component {...pageProps} />
            </AuthenticatedGuard>
        </Hydrate>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
