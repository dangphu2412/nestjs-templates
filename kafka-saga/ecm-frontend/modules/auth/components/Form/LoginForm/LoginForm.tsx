import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from '@chakra-ui/react';
import { GoogleLoginButton } from '@modules/auth/components/Button/LogInButton/GoogleLoginButton';
import { OAuthCredentialResponse } from '@modules/auth/clients';
import {
  BasicLoginRequest,
  LoginGoogleRequest,
  LoginType
} from '@modules/auth/services/auth-api-client';
import classes from './LoginForm.module.scss';

type LoginFormProps = {
  doLogin(inputs: BasicLoginRequest | LoginGoogleRequest): void;
  className?: string;
};

type FormInputs = {
  username: string;
  password: string;
};

export function LoginForm({
  doLogin,
  className
}: LoginFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  function onSubmit(inputs: FormInputs) {
    doLogin(inputs);
  }

  function handleLoginGoogleSuccess({
    credential: idToken
  }: OAuthCredentialResponse) {
    if (!idToken) {
      throw new Error('Missing idToken for login with google');
    }

    doLogin({
      idToken,
      loginType: LoginType.GOOGLE
    });
  }

  return (
    <div className={`${classes['form-container']} ${className ?? ''}`}>
      <Heading size="md" className="text-left mb-3" color="primary">
        Welcome back
      </Heading>

      <Text fontSize="sm" className="text-left mb-5">
        Enter your username and password to sign in
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors?.username?.message} isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', {
              minLength: 4,
              required: true
            })}
          />
          {errors.username && (
            <div>Username required longer than 6 character</div>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.password?.message} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              minLength: 6,
              required: true
            })}
          />
          {errors.password && (
            <div>Password required longer than 6 character</div>
          )}
        </FormControl>

        <Button
          variant="outline"
          colorScheme="teal"
          type="submit"
          className="w-full mt-5"
        >
          Sign In
        </Button>

        <GoogleLoginButton onSuccess={handleLoginGoogleSuccess} />
      </form>
    </div>
  );
}
