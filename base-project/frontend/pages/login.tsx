import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Grid, GridItem } from '@chakra-ui/react';
import { LoginForm } from '../modules/auth/components/Form/LoginForm/LoginForm';
import { FullLoader } from '../modules/shared/components/Loader/Full/FullLoader';
import { useLoginMutation } from '../modules/auth/hooks/useLoginMutation';
import { NextPageWithLayout } from './_app';

const LoginPage: NextPageWithLayout = () => {
  const { isLoading, mutate: doLogin } = useLoginMutation();

  return (
    <>
      <Head>
        <title>Login page example</title>
      </Head>

      <FullLoader isLoading={isLoading} />

      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem>
          <LoginForm doLogin={doLogin} />
        </GridItem>

        <GridItem>
          <Image
            src="/login-background.jpg"
            width={100}
            height={100}
            alt="Login background"
          />
        </GridItem>
      </Grid>
    </>
  );
};

/**
 * Way to disable default admin layout
 * Consider to create a common render function if we also need page like this
 */
LoginPage.getLayout = (page: React.ReactElement) => <>{page}</>;

export default LoginPage;
