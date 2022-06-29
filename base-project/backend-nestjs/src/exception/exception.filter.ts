import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { isClientException } from './exception-generator';
import { SystemExceptionClientCode } from './exception-client-code.constant';

@Catch(HttpException)
export class ClientExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(ClientExceptionFilter.name);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    if (isClientException(errorResponse)) {
      response.status(status).json({
        errorCode: errorResponse.errorCode,
        statusCode: status,
        message: errorResponse.message,
      });
      return;
    }

    this.logger.error(errorResponse);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: SystemExceptionClientCode.GOT_ISSUE.errorCode,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: SystemExceptionClientCode.GOT_ISSUE.message,
    });
  }
}
