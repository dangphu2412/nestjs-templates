import {
  CombineSearchFilter,
  Filter,
  FilterKey
} from '@/modules/shared/common/filter';
import { Pagination } from '@/modules/shared/clients';

export type AdminFilter = CombineSearchFilter<{
  joinedIn: Filter<FilterKey.RANGE>;
  memberType: Filter<FilterKey.EXACT>;
}>;

export type AdminState = {
  pagination: Pagination;
  filters: AdminFilter;
  isSubmitted: boolean;
};
