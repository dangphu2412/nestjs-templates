import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../config/store'
import { AuthenticatedGuard } from '../modules/auth/components/AuthenticatedGuard/AuthenticatedGuard.component'
import {Header} from "../modules/shared/components/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return <ChakraProvider>
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
                <AuthenticatedGuard
                    publicRoutes={['/login']}
                    defaultRoute={'/'}
                >
                    <Header/>
                    <Component {...pageProps} />
                </AuthenticatedGuard>
          </Provider>
       </Hydrate>
    </QueryClientProvider>
  </ChakraProvider>
}

export default MyApp
