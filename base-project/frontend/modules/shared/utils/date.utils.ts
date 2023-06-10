import { Range } from '@/modules/shared/common/filter';
import { add, sub } from 'date-fns';

export function getFilterDateRange(): Range<string> {
  const today = new Date();

  return {
    fromDate: sub(today, { days: 30 }).toString(),
    toDate: add(today, { days: 30 }).toString()
  };
}
