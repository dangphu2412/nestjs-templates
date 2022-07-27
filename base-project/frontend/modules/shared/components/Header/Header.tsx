import React from 'react';
import { Button, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';

export function Header(): React.ReactElement {
  return (
    <>
      Dashboard
      <Input placeholder="Search sth" />
      <FontAwesomeIcon icon={faUser} />
      <Button>Sign In</Button>
      <FontAwesomeIcon icon={faBell} />
    </>
  );
}
