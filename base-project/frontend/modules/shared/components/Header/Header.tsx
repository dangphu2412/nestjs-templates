import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Avatar
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { LogOutButton } from '../../../auth/components/Button/LogOutButton/LogOutButton';

type NavItem = {
  link: string;
  content: string;
};

export function Header(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const navItems: NavItem[] = [
    {
      content: 'Home',
      link: '/'
    },
    {
      content: 'Docs',
      link: '/docs'
    }
  ];

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      height="6rem"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="md" letterSpacing="tighter">
          SUF
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        {navItems.map(item => (
          <Text key={item.link}>
            <Link href={item.link}>{item.content}</Link>
          </Text>
        ))}
      </Stack>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Avatar
          size="sm"
          name="Kola Tioluwani"
          src="https://bit.ly/tioluwani-kolawole"
        />
        <Button
          variant="outline"
          _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
        >
          <Link href="/login">Login</Link>
        </Button>

        <LogOutButton className="ml-3" colorScheme="red" />
      </Box>
    </Flex>
  );
}
