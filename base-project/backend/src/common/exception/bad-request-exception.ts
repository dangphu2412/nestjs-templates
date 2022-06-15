import { HttpException } from './http-exception';
import { HttpStatus } from '../enum/http-status.enum';

export class BadRequestException extends HttpException {
  constructor(message = 'Bad request') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
