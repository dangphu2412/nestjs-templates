import { Transform } from 'class-transformer';
import { ConfigKeys, ConfigRegistry } from '../../config.registry';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

export function RegisterDefault(key: ConfigKeys) {
  return Transform((value: any) => {
    const defaultValue = ConfigRegistry.get(key);
    console.log(isEmpty(value) ? defaultValue : value);
    return isEmpty(value) ? defaultValue : value;
  });
}
