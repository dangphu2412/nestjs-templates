import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
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
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    if (isClientException(errorResponse)) {
      response.status(status).send({
        errorCode: errorResponse.errorCode,
        statusCode: status,
        message: errorResponse.message,
      });
      return;
    }

    // TODO: Do a mapping between http exception to client exception
    if (exception.getStatus() !== HttpStatus.INTERNAL_SERVER_ERROR) {
      response.status(status).send({
        errorCode: status + '',
        statusCode: status,
        message: (errorResponse as { message: string }).message,
      });
      return;
    }

    this.logger.error(errorResponse);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      errorCode: SystemExceptionClientCode.GOT_ISSUE.errorCode,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: SystemExceptionClientCode.GOT_ISSUE.message,
    });
  }
}
