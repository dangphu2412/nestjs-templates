import { RegisterDefault } from '../decorators/register-default';
import { ConfigKeys } from '../../config.registry';
import { IsNumber, IsOptional } from 'class-validator';
import { ToInt } from '../../../transformer/toInt.decorator';

export class OffsetPagination {
  @IsNumber()
  @ToInt()
  @RegisterDefault(ConfigKeys.DEFAULT_PAGE)
  page: number;

  @IsNumber()
  @ToInt()
  @RegisterDefault(ConfigKeys.DEFAULT_SIZE)
  size: number;
}
