import React from "react";
import {LoginForm} from "../modules/auth/components/Form/LoginForm/LoginForm";
import Head from "next/head";
import {FullLoader} from "../modules/shared/components/Loader/Full/FullLoader";
import {useMutation} from "react-query";
import {AuthApiClient} from "../modules/auth/services/auth-api-client";
import {useToast} from "@chakra-ui/react";
import {useClientErrorHandler} from "../modules/error-handling/useClientErrorHandler";
import {BrowserStorage, registerBrowserStorage} from "../modules/shared/services/browser-storage";
import {useRouter} from "next/router";

export default function LoginPage(): React.ReactElement {
    const toast = useToast();
    const errorHandler = useClientErrorHandler();
    const router = useRouter();

    const {mutate: doCredentialsLogin, isLoading} = useMutation(AuthApiClient.login, {
        onSuccess: async (data) => {
            registerBrowserStorage();
            data.tokens.forEach(token => {
                BrowserStorage.set(token.name, token.value);
            });
            await router.push('/');
        },
        onError: (error) => {
            const { isClientError, isSystemError, message } = errorHandler.handle(error);
            if (isClientError) {
                toast({
                    title: message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
                return;
            }
            if (isSystemError) {
                toast({
                    title: message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
                return;
            }
        }
    })

    return (
        <>

            <Head>
                <title>
                    Login page example
                </title>
            </Head>

            <FullLoader isLoading={isLoading}/>

            <LoginForm
                doLogin={doCredentialsLogin}
            />
        </>
    );
}
