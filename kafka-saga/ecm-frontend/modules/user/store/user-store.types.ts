import {
  CombineSearchFilter,
  Filter
} from '../../shared/common/filter/filter.api';
import { FilterKey } from '../../shared/common/filter/constant';
import { Pagination } from '../../shared/clients/list.api';

export type AdminFilter = CombineSearchFilter<{
  disabledIn: Filter<FilterKey.RANGE>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  isSubmitted: boolean;
};
