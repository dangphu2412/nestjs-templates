import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@chakra-ui/react';

type Props = {
  value: Date;
  onDateChange?(date: Date): void;
};

export function DatePicker({ onDateChange, value }: Props): React.ReactElement {
  const [startDate, setStartDate] = React.useState(value);

  function onChange(date: Date) {
    setStartDate(date);
    onDateChange?.(date);
  }

  return (
    <ReactDatePicker
      customInput={<Input />}
      selected={startDate}
      onChange={onChange}
    />
  );
}
