import { FilterQuery } from '@modules/shared/common/filter/filter.api';

export type Pagination = {
  page: number;
  size: number;
};

export type GetManyParams = {
  pagination: Pagination;
  filters: FilterQuery;
};
