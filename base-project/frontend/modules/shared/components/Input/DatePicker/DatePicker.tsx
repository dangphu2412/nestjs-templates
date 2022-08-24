import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@chakra-ui/react';

type Props = {
  onDateChange?(date: Date): void;
};

export function DatePicker({ onDateChange }: Props): React.ReactElement {
  const [startDate, setStartDate] = React.useState(new Date());

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
