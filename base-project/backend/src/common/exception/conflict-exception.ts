import { HttpException } from './http-exception';
import { HttpStatus } from '../enum/http-status.enum';

export class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(HttpStatus.CONFLICT, message);
  }
}
