import { HttpStatus } from '@nestjs/common';
import { Mapper } from '../../core/client/mapper.interface';

export class HttpToClientCodeMapper implements Mapper<HttpStatus, string> {
  from(from: HttpStatus): string {
    return from + '';
  }
}
