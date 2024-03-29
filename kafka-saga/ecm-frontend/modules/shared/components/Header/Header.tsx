import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useUser } from '@modules/user/contexts/UserContext/useUser.hook';
import styles from './Header.module.scss';

type UserActionItem = {
  text: React.ReactNode;
  link: string;
};

// If update css pls remember to change this
// TODO: Update handle of hook to track on element top position
const HEADER_TOP_SPACE = 24;

export function Header(): React.ReactElement {
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

  const { push } = useRouter();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isHeaderLeftTop, setIsHeaderLeftTop] = React.useState(false);
  const { state: user } = useUser();

  React.useEffect(() => {
    function handleDisplayHeader() {
      if (!headerRef.current) {
        return;
      }

      const isHeaderLeaving =
        headerRef.current.offsetTop > HEADER_TOP_SPACE && !isHeaderLeftTop;

      if (isHeaderLeaving) {
        setIsHeaderLeftTop(true);
        return;
      }

      const isHeaderBackToTop =
        headerRef.current.offsetTop === HEADER_TOP_SPACE && isHeaderLeftTop;
      if (isHeaderBackToTop) {
        setIsHeaderLeftTop(false);
      }
    }

    handleDisplayHeader();

    window.addEventListener('scroll', handleDisplayHeader);

    return () => window.removeEventListener('scroll', handleDisplayHeader);
  }, [isHeaderLeftTop]);

  return (
    <Flex
      ref={headerRef}
      className={classNames(
        styles['header-wrapper'],
        isHeaderLeftTop && styles.blur
      )}
      justifyContent="space-between"
      alignItems="center"
      paddingY="0.5rem"
      zIndex="998"
    >
      <div>
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem key="1">
            <BreadcrumbLink href="#">
              <FontAwesomeIcon icon={faStore} />
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem key="2">
            <BreadcrumbLink href="#">Pages</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem key="3">
            <BreadcrumbLink href="#">Current Menu</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Text
          align="left"
          fontSize="md"
          fontWeight="semibold"
          marginTop="0.5rem"
        >
          Current Menu
        </Text>
      </div>

      <Box p="4">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          className="space-x-4"
          flexDirection="row"
        >
          {user && (
            <Menu>
              <MenuButton cursor="pointer">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
              </MenuButton>

              <MenuList>
                {userActionItems.map(item => (
                  <MenuItem
                    key={`${item.link}`}
                    onClick={() => push(item.link)}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}

          {!user && <Button onClick={() => push('/auth/login')}>Login</Button>}
        </Flex>
      </Box>
    </Flex>
  );
}
