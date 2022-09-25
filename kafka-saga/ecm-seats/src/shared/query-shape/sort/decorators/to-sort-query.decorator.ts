import { Transform, TransformFnParams } from 'class-transformer';
import { SortQuery } from '../entities/sort.query';
import { SortDirection } from '../constants/sort-direction.enum';

export function ToSortQuery() {
  return Transform((params: TransformFnParams) => {
    if (!params.value) {
      return undefined;
    }
    const sorts = (params.value as string).split(',');

    return sorts.reduce((sortQuery: SortQuery<string>, currentSort) => {
      if (currentSort.startsWith('-')) {
        sortQuery[currentSort.slice(1)] = SortDirection.DESCENDING;
      } else {
        sortQuery[currentSort] = SortDirection.ASCENDING;
      }
      return sortQuery;
    }, {});
  });
}
