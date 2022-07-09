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
import classes from './LoginForm.module.scss';

type LoginFormProps = {
  doLogin(inputs: FormInputs): void;
};

type FormInputs = {
  username: string;
  password: string;
};

export function LoginForm(props: LoginFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  function onSubmit(inputs: FormInputs) {
    props.doLogin(inputs);
  }

  return (
    <>
      <div className={classes['form-layout']}>
        <div className={classes['form-container']}>
          <Heading size="md" className="text-center mb-3">
            Login
          </Heading>

          <Text fontSize="sm" className="mb-5">
            Hey, Enter your details to get sign in to your account
          </Text>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <FormControl isInvalid={!!errors?.username?.message} isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                {...register('username', {
                  minLength: 6,
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
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
