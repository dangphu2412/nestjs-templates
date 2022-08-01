import React from 'react';
import {
  Box,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

type UserActionItem = {
  text: React.ReactNode;
  link: string;
};

export const Header = React.forwardRef((): React.ReactElement => {
  const router = useRouter();

  const userActionItems: UserActionItem[] = [
    {
      text: 'Profile',
      link: '/profile'
    },
    {
      text: 'Settings',
      link: '/settings'
    },
    {
      text: 'Log Out',
      link: '/logout'
    }
  ];

  return (
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

          <Menu>
            <MenuButton cursor="pointer">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
            </MenuButton>
            <MenuList>
              {userActionItems.map(item => (
                <>
                  <MenuItem
                    key={item.link}
                    onClick={() => router.push(item.link)}
                  >
                    {item.text}
                  </MenuItem>
                </>
              ))}
            </MenuList>
          </Menu>

          <div>
            <FontAwesomeIcon icon={faBell} />
          </div>
        </Flex>
      </Box>
    </Flex>
  );
});
