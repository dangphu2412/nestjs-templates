import {FormControl, FormHelperText, FormLabel, Input, Heading} from "@chakra-ui/react";
import React from "react";

export default function LoginPage(): React.ReactElement {
    return (
        <>
            <h1 className={'text-2xl'}>Hello tailwind</h1>
            <Heading as="h1" size="2xl" mb="2">
                Welcome to Next.js!
            </Heading>
            <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' />
                <FormHelperText>We ll never share your email.</FormHelperText>
            </FormControl>
        </>
    );
}
