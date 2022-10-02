import React from 'react';

type Props = React.ComponentProps<'select'> & {
  pageSizeItems: number[];
  pageSize: number;
  setPageSize: (pageSize: number) => void;
};

export function ItemPerPageSelector({
  pageSizeItems,
  pageSize,
  setPageSize,
  ...rest
}: Props): React.ReactElement {
  function handleSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(parseInt(e.target.value, 10));
  }

  return (
    <select onChange={handleSelection} {...rest} value={pageSize}>
      {pageSizeItems.map(item => {
        return <option key={item}>{item}</option>;
      })}
    </select>
  );
}
