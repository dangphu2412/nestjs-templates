import React from 'react';

type Props = React.ComponentProps<'select'>;

export function ItemPerPageSelector(props: Props): React.ReactElement {
  return (
    <select placeholder="Select page size" {...props}>
      <option value="option1">10</option>
      <option value="option2">20</option>
      <option value="option3">30</option>
    </select>
  );
}
