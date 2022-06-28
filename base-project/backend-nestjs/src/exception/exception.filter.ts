import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';
import { isClientException } from './exception-generator';
import { SystemExceptionClientCode } from './exception-client-code.constant';

@Catch(HttpException)
export class ClientExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (isClientException(exception)) {
      response.status(status).json({
        errorCode: exception.errorCode,
        statusCode: status,
        message: exception.message,
      });
      return;
    }

    this.logger.error(exception.message);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: SystemExceptionClientCode.GOT_ISSUE.errorCode,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: SystemExceptionClientCode.GOT_ISSUE.message,
    });
  }
}
