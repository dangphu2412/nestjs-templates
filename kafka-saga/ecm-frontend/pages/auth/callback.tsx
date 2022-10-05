import React from 'react';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { NextPageWithLayout } from '../_app';

const LoginOAuthCallbackPage: NextPageWithLayout = () => {
  return <>Hello Callback</>;
};

LoginOAuthCallbackPage.getLayout = NoLayout;

export default LoginOAuthCallbackPage;
