import { Transform, TransformFnParams } from 'class-transformer';
import { DateRange } from '../entities/date-range.query';
import { isEmpty } from 'class-validator';

export function ToDateRange() {
  return Transform((params: TransformFnParams) => {
    if (!params.value) {
      return undefined;
    }
    const [fromDate, toDate] = (params.value as string).split(',');
    const dateRange = new DateRange();
    dateRange.fromDate = isEmpty(fromDate) ? undefined : new Date(fromDate);
    dateRange.toDate = isEmpty(toDate) ? undefined : new Date(toDate);
    return dateRange;
  });
}
