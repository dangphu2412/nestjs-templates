import { Filter, FilterQuery } from './filter.api';
import { FilterKey } from './constant';
import { isFilterType } from './filter-type.guard';

export function toFilterQuery(
  filters: Record<string, Filter<any>>
): FilterQuery {
  const query: FilterQuery = {};

  Object.keys(filters).forEach(filterKey => {
    const filter = filters[filterKey];
    if (isFilterType(filter, FilterKey.EXACT)) {
      query[filterKey] = filter.value;
    } else if (isFilterType(filter, FilterKey.LIKE)) {
      query.search = filter.value;
    } else if (isFilterType(filter, FilterKey.RANGE)) {
      query[filterKey] = filter.value;
    } else if (isFilterType(filter, FilterKey.BOOLEAN)) {
      query[filterKey] = filter.value;
    }
  });

  return query;
}
