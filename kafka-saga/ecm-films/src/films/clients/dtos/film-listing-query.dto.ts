import { FilmListingQuery } from '../../internal/proto/films.grpc';
import { OffsetPagination } from '../../../shared/query-shape/pagination/entities/offset-pagination.request';
import { IsOptional, IsString } from 'class-validator';

export class FilmListingQueryDto
  extends OffsetPagination
  implements FilmListingQuery
{
  @IsOptional()
  @IsString()
  search: string;
}
