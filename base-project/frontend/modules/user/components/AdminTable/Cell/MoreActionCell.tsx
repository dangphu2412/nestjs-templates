import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { CellProps } from 'react-table';
import styles from './Cell.module.scss';
import { useMutateUserActive } from '../../../hooks/data/useMutateUserActive';
import { User } from '../../../models/user.type';

type ActionOnUserItem = {
  key: string;
  content: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function MoreActionCell({
  row
}: CellProps<User, string>): React.ReactElement {
  const { mutate: toggleUserActive } = useMutateUserActive();

  const actionItems: ActionOnUserItem[] = [
    {
      key: `UPDATE_USER_KEY${row.original.id}`,
      content: 'Update user'
    },
    {
      key: `TOGGLE_STATUS_KEY${row.original.id}`,
      content: 'Toggle status',
      onClick: () => toggleUserActive(row.original.id)
    }
  ];

  return (
    <Menu>
      <MenuButton className={styles['cell-more-option']} cursor="pointer">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </MenuButton>
      <MenuList>
        {actionItems.map(item => (
          <>
            <MenuItem key={item.key} onClick={item.onClick}>
              {item.content}
            </MenuItem>
          </>
        ))}
      </MenuList>
    </Menu>
  );
}
