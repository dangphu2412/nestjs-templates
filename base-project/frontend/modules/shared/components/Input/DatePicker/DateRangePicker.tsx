import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@chakra-ui/react';

type DateRange = [Date, Date];

type Props = {
  onDatesChange(dates: DateRange): void;
};

export function DateRangePicker({ onDatesChange }: Props): React.ReactElement {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  function onChange([currentStartDate, currentEndDate]: DateRange) {
    setStartDate(currentStartDate);
    setEndDate(currentEndDate);
    onDatesChange([currentStartDate, currentEndDate]);
  }

  return (
    <ReactDatePicker
      customInput={<Input />}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      onChange={onChange}
    />
  );
}
