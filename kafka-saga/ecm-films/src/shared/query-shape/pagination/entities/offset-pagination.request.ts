import { ToDefault } from '../decorators/to-default';
import { ConfigKeys, ConfigRegistry } from '../../config.registry';
import { IsNumber } from 'class-validator';
import { ToInt } from '../../../transformer/toInt.decorator';

// Proto auto transform number to 0 === cannot parse
// TODO: improve this
export class OffsetPagination {
  @ToInt()
  @ToDefault(ConfigKeys.DEFAULT_PAGE)
  @IsNumber()
  page: number = ConfigRegistry.get(ConfigKeys.DEFAULT_PAGE);

  @ToInt()
  @ToDefault(ConfigKeys.DEFAULT_SIZE)
  @IsNumber()
  size: number = ConfigRegistry.get(ConfigKeys.DEFAULT_SIZE);
}
