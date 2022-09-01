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
import { HttpToClientCodeMapper } from './mapper/http-to-client-code.mapper';
import { Mapper } from '../core/client/mapper.interface';

@Catch()
export class ClientExceptionFilter implements ExceptionFilter {
  private static readonly logger: Logger = new Logger(
    ClientExceptionFilter.name,
  );
  private static readonly httpClientMapper: Mapper<HttpStatus, string> =
    new HttpToClientCodeMapper();

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    if (!(exception instanceof HttpException)) {
      ClientExceptionFilter.logger.error(exception.message);
      ClientExceptionFilter.logger.error(exception.stack);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errorCode: SystemExceptionClientCode.GOT_ISSUE.errorCode,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: SystemExceptionClientCode.GOT_ISSUE.message,
      });
      return;
    }

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

    if (exception.getStatus() !== HttpStatus.INTERNAL_SERVER_ERROR) {
      const clientCode = ClientExceptionFilter.httpClientMapper.from(
        exception.getStatus(),
      );

      response.status(status).send({
        errorCode: clientCode,
        statusCode: status,
        message: (errorResponse as { message: string }).message,
      });
      return;
    }

    ClientExceptionFilter.logger.error(exception.message);
    ClientExceptionFilter.logger.error(exception.stack);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      errorCode: SystemExceptionClientCode.GOT_ISSUE.errorCode,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: SystemExceptionClientCode.GOT_ISSUE.message,
    });
  }
}
