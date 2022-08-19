import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

type UserActionItem = {
  text: React.ReactNode;
  link: string;
};

// If update css pls remember to change this
// TODO: Update handle of hook to track on element top position
const HEADER_TOP_SPACE = 8;

export const Header = React.forwardRef((): React.ReactElement => {
  const router = useRouter();
  const headerRef = React.useRef<HTMLDivElement>(null);

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

  const [isHeaderLeftTop, setIsHeaderLeftTop] = React.useState(false);

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
      className="mx-6 pt-4 sticky top-2"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={isHeaderLeftTop ? 'white' : undefined}
      paddingX="1rem"
      paddingY="0.5rem"
      borderRadius="lg"
    >
      <div>
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <FontAwesomeIcon icon={faStore} />
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Pages</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
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
