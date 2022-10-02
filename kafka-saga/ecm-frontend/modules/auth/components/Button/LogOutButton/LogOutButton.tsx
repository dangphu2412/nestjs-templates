import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../../../shared/services/browser-storage';

type Props = ButtonProps;

export function LogOutButton(props: Props): React.ReactElement {
  const router = useRouter();
  async function onLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!props.onClick) {
      // TODO: Fetch tokens name from backend
      registerBrowserStorage('localStorage');
      BrowserStorage.remove('accessToken');
      BrowserStorage.remove('refreshToken');
      await router.push('/login');
      return;
    }
    props.onClick(e);
  }

  return (
    <Button {...props} onClick={onLogout}>
      Logout
    </Button>
  );
}
