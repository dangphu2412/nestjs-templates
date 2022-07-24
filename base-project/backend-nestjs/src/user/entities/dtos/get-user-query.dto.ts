import { OffsetPagination } from '../../../shared/query-shape/pagination/entities/offset-pagination.request';
import { DateRange } from '../../../shared/query-shape/filter/entities/date-range';
import { ToDateRange } from '../../../shared/query-shape/filter/decorators/to-date-range.decorator';
import { ValidateNested } from 'class-validator';

export class GetUserQueryDto extends OffsetPagination {
  @ToDateRange()
  @ValidateNested()
  activeDateRange?: DateRange;
}
