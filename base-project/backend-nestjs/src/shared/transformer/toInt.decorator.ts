import { Transform } from 'class-transformer';

export function ToInt() {
  return Transform((value: any) => {
    return parseInt(value);
  });
}
