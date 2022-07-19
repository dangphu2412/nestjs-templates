import { Transform, TransformFnParams } from 'class-transformer';
import { ConfigKeys, ConfigRegistry } from '../../config.registry';
import { isEmpty } from 'class-validator';

export function RegisterDefault(key: ConfigKeys) {
  return Transform((params: TransformFnParams) => {
    const defaultValue = ConfigRegistry.get(key);
    return isEmpty(params.value) ? defaultValue : params.value;
  });
}
