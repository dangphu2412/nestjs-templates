import React from 'react';
import { Button, Flex, Input, Box, Spacer } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';

export function Header(): React.ReactElement {
  return (
    <>
      <Flex className="mx-6">
        <Box p="4">Dashboard</Box>
        <Spacer />

        <Box p="4">
          <Flex
            justifyContent="center"
            alignItems="center"
            className="space-x-4"
          >
            <Input placeholder="Type here" />
            <Button className="px-4">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Sign In
            </Button>
            <FontAwesomeIcon icon={faBell} />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
