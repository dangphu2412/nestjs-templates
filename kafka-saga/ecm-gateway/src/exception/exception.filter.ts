import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyReply } from 'fastify';
import { generateClientException } from './exception-generator';
import { SystemExceptionClientCode } from './exception-client-code.constant';
import { Mapper } from '../core/client/mapper.interface';
import { status as RpcStatus } from '@grpc/grpc-js';
import { RpcToHttpStatusMapper } from './mapper/rpc-to-http-status.mapper';
import { isRpcException } from './filters/is-rpc-exception';
import { ClientError, RpcException } from './entities/exception.types';
import { HttpClientErrorMapper } from './mapper/http-client-error.mapper';

@Catch()
export class AllExceptionFilter implements RpcExceptionFilter<RpcException> {
  private static readonly logger: Logger = new Logger(AllExceptionFilter.name);
  private readonly httpStatusMapper: Mapper<RpcStatus, HttpStatus>;
  private readonly httpClientErrorMapper: Mapper<HttpException, ClientError>;

  constructor() {
    this.httpStatusMapper = new RpcToHttpStatusMapper();
    this.httpClientErrorMapper = new HttpClientErrorMapper();
  }

  catch(
    exception: RpcException | HttpException | Error,
    host: ArgumentsHost,
  ): Observable<any> {
    const response = host.switchToHttp().getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorCode = this.httpClientErrorMapper.from(exception).errorCode;

      response.status(status).send({
        statusCode: status,
        errorCode,
        message: exception.message,
      });
      return;
    }

    if (!isRpcException(exception)) {
      AllExceptionFilter.logger.error(exception.message);
      AllExceptionFilter.logger.error(exception.stack);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        ...SystemExceptionClientCode.GOT_ISSUE,
      });
      return;
    }

    const httpStatus = this.httpStatusMapper.from(exception.code);

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      AllExceptionFilter.logger.error(exception.message);
      AllExceptionFilter.logger.error(exception.stack);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus,
        ...SystemExceptionClientCode.SERVICE_GOT_ISSUE,
      });
      return;
    }

    const message = exception.metadata.get('ERROR_MESSAGE').toString();

    const clientException = generateClientException({
      errorCode: exception.details,
      message: message ?? 'There is an error happened',
    });

    response.status(httpStatus).send({
      statusCode: httpStatus,
      ...clientException,
    });
  }
}
