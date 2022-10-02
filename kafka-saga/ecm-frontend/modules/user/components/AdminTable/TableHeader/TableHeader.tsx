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
import { useForm } from 'react-hook-form';

export type CreateUserInputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onAddNewUser(createUserInputs: CreateUserInputs): void;
};

export function TableHeader({ onAddNewUser }: Props): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { register, handleSubmit } = useForm<CreateUserInputs>();

  function handleSaveUser(createUserInputs: CreateUserInputs): void {
    onAddNewUser(createUserInputs);
    onClose();
  }

  return (
    <Flex justifyContent="space-between" className="pt-6 pb-2">
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
              <Input
                {...register('username')}
                type="text"
                placeholder="Please enter user name"
              />
            </div>

            <div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...register('password')}
                type="password"
                placeholder="Please enter password"
              />
            </div>

            <div>
              <FormLabel htmlFor="confirmPassword">
                Confirm Your Password
              </FormLabel>
              <Input
                {...register('confirmPassword')}
                type="password"
                placeholder="Please confirm your password"
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit(handleSaveUser)}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
