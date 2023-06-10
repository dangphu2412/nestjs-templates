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
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';
import { CreateUserType } from '@/modules/user/constants/admin-management.constants';
import { UseDisclosureApi } from '@/modules/shared/clients/disclosure.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object, string } from 'yup';
import { MonthlyMoneyConfig } from '@/modules/monthly-money/clients/monthly-money.types';
import { FullLoader } from '@/modules/shared/components/Loader/Full/FullLoader';
import { read } from 'xlsx';

export type CreateUserInputs = {
  createType: CreateUserType;
  email: string;
  fullName: string;
  birthday?: string;
  monthlyConfigId?: string;
  excelFile?: { file: File; processSheetName: string };
  processSheetNameOptions?: string[];
};

type AddUserDrawerProps = Omit<UseDisclosureApi, 'onOpen'> & {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  monthlyMoneyConfigs: MonthlyMoneyConfig[];
  isLoading: boolean;
  onAddNewUser(createUserInputs: CreateUserInputs): void;
};

const validationSchema = object({
  createType: mixed<CreateUserType>()
    .oneOf(Object.values(CreateUserType))
    .required(),
  email: string().optional().email(),
  fullName: string().optional(),
  birthday: string().optional(),
  monthlyConfigId: string().optional().when('createType', {
    is: CreateUserType.NEW_MEMBERS,
    then: string().required()
  })
});

export function AddUserDrawer({
  isOpen,
  isLoading,
  onClose,
  finalFocusRef,
  onAddNewUser,
  monthlyMoneyConfigs
}: AddUserDrawerProps): React.ReactElement {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CreateUserInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      fullName: '',
      birthday: '',
      createType: CreateUserType.NEWBIE,
      excelFile: undefined,
      processSheetNameOptions: undefined
    }
  });

  const createUserType = watch('createType');
  const excelFile = watch('excelFile');
  const processSheetNameOptions = watch('processSheetNameOptions');

  const saveUser: SubmitHandler<CreateUserInputs> = inputs => {
    onAddNewUser(inputs);
  };

  async function handleSelectFile(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const file = Array.from(e.target.files ?? [])?.[0];

    if (!file) {
      throw new Error('Empty file selected');
    }

    const workbook = read(await file.arrayBuffer());

    setValue('processSheetNameOptions', workbook.SheetNames);

    setValue('excelFile', {
      file,
      processSheetName: ''
    });
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      size="lg"
    >
      <DrawerOverlay />
      <FullLoader isLoading={isLoading} />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Create new S-Group members</DrawerHeader>

        <DrawerBody className="space-y-2">
          <FormControl>
            <FormLabel htmlFor="create-user-type">Create type</FormLabel>

            <Select placeholder="Select option" {...register('createType')}>
              {Object.values(CreateUserType).map(type => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          {createUserType !== CreateUserType.EXCEL && (
            <>
              <FormControl isInvalid={!!errors.email} pt="1rem">
                <FormLabel>Email</FormLabel>

                <Input type={'email'} {...register('email')} />

                {errors.email && (
                  <FormErrorMessage>Incorrect email format</FormErrorMessage>
                )}
              </FormControl>

              <FormControl pt="1rem">
                <FormLabel>Full name</FormLabel>

                <Input {...register('fullName')} />

                {errors.fullName && (
                  <FormErrorMessage>
                    Incorrect full name format
                  </FormErrorMessage>
                )}
              </FormControl>
            </>
          )}

          {[CreateUserType.NEW_MEMBERS, CreateUserType.EXCEL].includes(
            createUserType
          ) && (
            <FormControl pt="1rem">
              <FormLabel htmlFor="monthly-configs">Monthly paid</FormLabel>

              <Select
                placeholder="Select option"
                {...register('monthlyConfigId')}
              >
                {monthlyMoneyConfigs.map(config => {
                  return (
                    <option value={config.id} key={config.id}>
                      {`${config.amount}K / ${config.monthRange} month`}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          )}

          {createUserType === CreateUserType.EXCEL && (
            <FormControl>
              <FormLabel borderWidth="0.5rem">
                Upload file: {excelFile?.file?.name}
                <Input type="file" onChange={handleSelectFile} />
              </FormLabel>

              <FormLabel htmlFor="create-user-type">Process options</FormLabel>

              <Select
                placeholder="Select option"
                {...register('excelFile.processSheetName')}
              >
                {processSheetNameOptions &&
                  processSheetNameOptions?.map(name => {
                    return (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(saveUser)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
