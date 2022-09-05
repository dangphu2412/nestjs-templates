import { IsOptional, ValidateNested } from 'class-validator';
import { OffsetPagination } from '../../../shared/query-shape/pagination/entities/offset-pagination.request';
import { DateRange } from '../../../shared/query-shape/filter/entities/date-range.query';
import { ToDateRange } from '../../../shared/query-shape/filter/decorators/to-date-range.decorator';
import { SortQuery } from '../../../shared/query-shape/sort/entities/sort.query';
import { ToSortQuery } from '../../../shared/query-shape/sort/decorators/to-sort-query.decorator';
import { IsSortQueryContains } from '../../../shared/query-shape/sort/decorators/is-sort-query-contains.decorator';

export class UserManagementQuery extends OffsetPagination {
  @ToDateRange()
  @ValidateNested()
  activeDateRange?: DateRange;

  @ToSortQuery()
  @IsOptional()
  @IsSortQueryContains(['username', 'deadDate'])
  sort?: SortQuery<'username' | 'deadDate'>;
}
