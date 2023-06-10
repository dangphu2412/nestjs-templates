import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';

type Props = {
  onAgree: () => void;
};

export function ConfirmExtractEmailsPopup({
  onAgree
}: Props): React.ReactElement {
  const { isOpen, onClose } = useDisclosure({
    id: 'createDrawer',
    defaultIsOpen: true
  });

  function handleAgree() {
    onAgree();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Do you want to extract un-existed emails?</ModalHeader>

        <ModalFooter>
          <Button onClick={handleAgree} colorScheme="blue" mr={3}>
            Agree
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
