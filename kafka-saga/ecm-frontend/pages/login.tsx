import React from 'react';
import Head from 'next/head';
import { Container, Grid, GridItem, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { LoginForm } from '@modules/auth/components/Form/LoginForm/LoginForm';
import { FullLoader } from '@modules/shared/components/Loader/Full/FullLoader';
import { useLoginMutation } from '@modules/auth/hooks/useLoginMutation';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { ProtectPrivateGuard } from '@modules/auth/guards/protect-private.guard';
import { NextPageWithLayout } from './_app';

const LoginPage: NextPageWithLayout = () => {
  const { isLoading, mutate: doLogin } = useLoginMutation();
  const router = useRouter();

  React.useEffect(() => {
    if (
      ProtectPrivateGuard.canAccess({
        accessPathName: router.pathname,
        publicRoutes: ['login']
      })
    ) {
      router.replace('/');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Login page example</title>
      </Head>

      <FullLoader isLoading={isLoading} />

      <Container maxW="container.xl">
        <Grid templateColumns="repeat(2, 1fr)" height="100vh">
          <GridItem>
            <LoginForm doLogin={doLogin} />
          </GridItem>

          <GridItem>
            <div>
              <Image
                className="h-screen"
                src="/login-background.jpg"
                alt="Background image"
              />
            </div>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

LoginPage.getLayout = NoLayout;

export default LoginPage;
