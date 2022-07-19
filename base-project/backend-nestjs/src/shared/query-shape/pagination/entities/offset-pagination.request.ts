import { RegisterDefault } from '../decorators/register-default';
import { ConfigKeys } from '../../config.registry';
import { IsNumber } from 'class-validator';
import { ToInt } from '../../../transformer/toInt.decorator';

export class OffsetPagination {
  @ToInt()
  @RegisterDefault(ConfigKeys.DEFAULT_PAGE)
  @IsNumber()
  page: number;

  @ToInt()
  @RegisterDefault(ConfigKeys.DEFAULT_SIZE)
  @IsNumber()
  size: number;
}
