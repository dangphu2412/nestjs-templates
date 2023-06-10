import { FilterKey } from './constant';
import { Filter } from './filter.api';

export function isFilterType<T extends FilterKey>(
  filter: Partial<Filter<any>>,
  typeCompare: T
): filter is Filter<T> {
  if (filter.type !== typeCompare) {
    return false;
  }

  if (
    [FilterKey.EXACT, FilterKey.LIKE, FilterKey.BOOLEAN].includes(filter.type)
  ) {
    return !!filter.value;
  }

  if (filter.type === FilterKey.RANGE) {
    return (
      !!filter.value &&
      !!(filter as Filter<FilterKey.RANGE>).value.fromDate &&
      !!(filter as Filter<FilterKey.RANGE>).value.toDate
    );
  }

  return false;
}
