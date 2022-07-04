import React from "react";
import {useForm} from "react-hook-form";
import {FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import {useMutation} from "react-query";
import {AuthClient} from "../../../services/auth.client";
import {useClientErrorHandler} from "../../../../error-handling/useClientErrorHandler";
import Link from "next/link";

type FormInputs = {
    username: string;
    password: string;
}

export function LoginForm(): React.ReactElement {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const toast = useToast();
    const errorHandler = useClientErrorHandler();

    const {mutate, isLoading} = useMutation(AuthClient.login, {
        onSuccess: () => {
            alert('Login success');
        },
        onError: (error) => {
            const { isClientError, message } = errorHandler.handle(error);
            if (isClientError) {
                toast({
                    title: message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
            }
        }
    })

    function onSubmit(inputs: FormInputs) {
        mutate(inputs);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
                isInvalid={!!errors?.username?.message}
                isRequired
            >
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input id='username' type='text' {...register('username', {
                    minLength: 6,
                    required: true
                })}/>
                {
                    errors.username &&
                    <div>Username required longer than 6 character</div>
                }
            </FormControl>

            <FormControl
                isInvalid={!!errors?.password?.message}
                isRequired
            >
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password' {...register('password', {
                    minLength: 6,
                    required: true
                })}/>
                {
                    errors.password &&
                    <div>Password required longer than 6 character</div>
                }
            </FormControl>

            <button type="submit">
                Submit
            </button>

            <Link href={'/register'}>
                <button type="submit">
                    Register
                </button>
            </Link>
        </form>
    );
}
