import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { isClientException } from './exception-generator';
import { SystemExceptionClientCode } from './exception-client-code.constant';

@Catch(HttpException)
export class ClientExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (isClientException(exception.message)) {
      response.status(status).json({
        errorCode: exception.message,
        statusCode: status,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: SystemExceptionClientCode.GOT_ISSUE,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
