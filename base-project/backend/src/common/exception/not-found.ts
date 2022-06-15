import { HttpException } from './http-exception';
import { HttpStatus } from '../enum/http-status.enum';

export class NotFoundException extends HttpException {
  constructor(message = 'Not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
