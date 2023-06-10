import React from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../models/user.type';
import { useMutateUserActive } from '@/modules/user/hooks/data/useMutateUserActive';
import { Switch } from '@chakra-ui/react';

export function StatusCell({
  value,
  row
}: CellProps<UserManagementView, string>): React.ReactElement {
  const { mutate: toggleUserActive } = useMutateUserActive();

  return (
    <Switch
      isChecked={value === null}
      onChange={() => toggleUserActive(row.original.id)}
      colorScheme={'green'}
    />
  );
}
