import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AddUserDrawer,
  CreateUserInputs
} from '@/modules/user/components/AdminTable/TableHeader/AddUserDrawer';
import { useQueryMonthlyMoneyConfigs } from '@/modules/monthly-money/hooks';
import { useMutateCreateUser } from '@/modules/user/hooks/data/useMutateCreateUser';

export function HeaderActions(): React.ReactElement {
  const addNewUserButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'createDrawer'
  });

  const { data: monthlyMoneyConfigs } = useQueryMonthlyMoneyConfigs({
    isEnabled: isOpen
  });

  const { mutate: dispatchCreateUser, isLoading } = useMutateCreateUser();

  function handleAddNewUser(createUserInputs: CreateUserInputs): void {
    dispatchCreateUser({
      createUserType: createUserInputs.createType,
      email: createUserInputs.email,
      fullName: createUserInputs.fullName,
      birthday: createUserInputs.birthday,
      monthlyConfigId: createUserInputs.monthlyConfigId,
      attachment: createUserInputs.excelFile?.file,
      processSheetName: createUserInputs.excelFile?.processSheetName
    });
  }

  return (
    <>
      <Button ref={addNewUserButtonRef} colorScheme="pink" onClick={onOpen}>
        <FontAwesomeIcon className="mr-2" icon={faPlus} />
        Add
      </Button>

      {isOpen && (
        <AddUserDrawer
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={onClose}
          finalFocusRef={addNewUserButtonRef}
          onAddNewUser={handleAddNewUser}
          monthlyMoneyConfigs={monthlyMoneyConfigs ?? []}
        />
      )}
    </>
  );
}
