import React from 'react';
import { Flex, Input, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';

export function Header(): React.ReactElement {
  return (
    <>
      <Flex
        className="mx-6 mt-4"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="py-4 font-bold">Dashboard</div>

        <Box p="4">
          <Flex
            justifyContent="center"
            alignItems="center"
            className="space-x-4"
            flexDirection="row"
          >
            <Input placeholder="Type here" />
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
            </div>

            <div>
              <FontAwesomeIcon icon={faBell} />
            </div>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
