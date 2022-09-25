import { Transform, TransformFnParams } from 'class-transformer';

export function ToInt() {
  return Transform((params: TransformFnParams) => {
    const parsedValue = parseInt(params.value);
    return isNaN(parsedValue) ? params.value : parsedValue;
  });
}
