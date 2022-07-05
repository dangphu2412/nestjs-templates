import React from "react";
import {useForm} from "react-hook-form";
import {Button, FormControl, FormLabel, Heading, Input, Text, useToast} from "@chakra-ui/react";
import {useMutation} from "react-query";
import {AuthClient} from "../../../services/auth.client";
import {useClientErrorHandler} from "../../../../error-handling/useClientErrorHandler";
import classes from './LoginForm.module.scss';

type FormInputs = {
    username: string;
    password: string;
}

export function LoginForm(): React.ReactElement {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const toast = useToast();
    const errorHandler = useClientErrorHandler();

    const {mutate} = useMutation(AuthClient.login, {
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
        <div className={classes['form-layout']}>
            <div className={classes['form-container']}>

                <Heading size={'md'} className={'text-center mb-3'}>
                    Login
                </Heading>

                <Text fontSize={'sm'} className={'mb-5'}>
                    Hey, Enter your details to get sign in to your account
                </Text>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes['form']}
                >
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

                    <Button
                        variant="outline"
                        colorScheme={'teal'}
                        type="submit"
                        className={'w-full mt-5'}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
