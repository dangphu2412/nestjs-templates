import { ReactElement } from 'react';
import { useQueryUsers } from '@/modules/user/hooks/data/useQueryUsers';
import { PaginationContainer } from '@/modules/user/components/AdminTable/PaginationContainer/PaginationContainer';
import { TableHeaderContainer } from '@/modules/user/components/AdminTable/TableHeader/TableHeaderContainer';
import { AdminContainer } from '@/modules/user/containers/AdminContainer/AdminContainer';
import { FilterBar } from '@/modules/user/components/AdminTable/FilterBar/FilterBar';
import { FullLoader } from '@/modules/shared/components/Loader/Full/FullLoader';
import { AdminTable } from '@/modules/user/components/AdminTable/AdminTable';

export default function AdministratorPage(): ReactElement {
  const { data, isLoading } = useQueryUsers();

  return (
    <AdminContainer>
      <FullLoader isLoading={isLoading} />

      <TableHeaderContainer />
      <FilterBar />
      <PaginationContainer totalRecords={data?.metadata.totalRecords} />

      <AdminTable data={data} />
    </AdminContainer>
  );
}
