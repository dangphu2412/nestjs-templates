import React from 'react';
import { TableHeader } from './TableHeader';

export function TableHeaderContainer(): React.ReactElement {
  function handleAddNewUser() {
    alert('Crete new user');
  }

  return (
    <>
      <TableHeader onAddNewUser={handleAddNewUser} />
    </>
  );
}
