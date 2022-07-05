import React from "react";
import {LoginForm} from "../modules/auth/components/Form/LoginForm/LoginForm";
import Head from "next/head";

export default function LoginPage(): React.ReactElement {
    return (
        <>
            <Head>Login page example</Head>

            <LoginForm/>
        </>
    );
}
