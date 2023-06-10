import { ReactElement } from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '@/modules/user/models/user.type';
import { Role } from '@/modules/user/models/rbac.types';

export function RoleCell({
  value
}: CellProps<UserManagementView, Role[]>): ReactElement {
  return (
    <>
      {value.map(role => (
        <div key={role.id}>{role.name}</div>
      ))}
    </>
  );
}
