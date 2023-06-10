import { ReactElement } from 'react';
import { CellProps } from 'react-table';
import { UserManagementView } from '../../../models/user.type';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

export function UsernameCell({
  value,
  row
}: CellProps<UserManagementView, string>): ReactElement {
  return (
    <>
      <div>
        <Link color="teal.500" href="#">
          <NextLink href={`/users/${row.original.id}/profile`}>
            {value}
          </NextLink>
        </Link>
      </div>

      {row.original.avatar && (
        <Image src={row.original.avatar} alt="No avatar" />
      )}
    </>
  );
}
