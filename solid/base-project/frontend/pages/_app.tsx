import '../styles/globals.css'
import type {AppProps} from 'next/app'
import * as React from 'react'
import {useContext} from 'react'
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'
import store from '../config/store.config';
import {Provider} from 'react-redux';
import {useRouter} from "next/router";
import {AuthContext, AuthState} from "../modules/auth/auth.context";
import {ChakraProvider} from "@chakra-ui/provider";

function MyApp({Component, pageProps}: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());
    const authContext = useContext(AuthContext);
    const router = useRouter();

    React.useEffect(() => {
        async function verifyAuthState() {
            if (authContext.authState === AuthState.IS_LOGOUT
                && window.location.pathname !== '/auth/login') {
                await router.push('/auth/login');
            }
        }

        verifyAuthState();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ChakraProvider>
                        <AuthContext.Provider value={authContext}>
                            <Component {...pageProps} />
                        </AuthContext.Provider>
                    </ChakraProvider>
                </Hydrate>
            </Provider>
        </QueryClientProvider>
    )
}

export default MyApp
