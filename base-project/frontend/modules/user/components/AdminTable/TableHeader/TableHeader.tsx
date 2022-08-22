import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onAddNewUser: React.MouseEventHandler<HTMLButtonElement>;
};

export function TableHeader({ onAddNewUser }: Props): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Flex justifyContent="space-between" className="p-6">
      <div>
        <Text fontSize="lg" fontWeight="semibold">
          Administrator management
        </Text>
        <Text fontSize="sm" fontWeight="light">
          Where you can create, update and change user active
        </Text>
      </div>

      <Button ref={btnRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        New user
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody className="space-y-2">
            <div>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" placeholder="Please enter user name" />
            </div>

            <div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" placeholder="Please enter password" />
            </div>

            <div>
              <FormLabel htmlFor="confirmPassword">
                Confirm Your Password
              </FormLabel>
              <Input
                id="confirmPassword"
                placeholder="Please confirm your password"
              />
            </div>

            <div>
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Input id="avatar" />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onAddNewUser}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
