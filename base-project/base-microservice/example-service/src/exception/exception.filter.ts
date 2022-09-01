import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common';
import { NewsGrpcExceptionCode } from './exception-client-code.constant';
import { BaseRpcException } from './rpc/base-rpc.exception';
import { UnavailableRpcException } from './rpc/unavailable-rpc.exception';
import { throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter {
  private static logger: Logger = new Logger(AllExceptionsFilter.name);

  catch(exception: BaseRpcException | Error) {
    if (exception instanceof BaseRpcException) {
      return;
    }

    AllExceptionsFilter.logger.error(exception.message);
    AllExceptionsFilter.logger.error(exception.stack);
    return throwError(
      () => new UnavailableRpcException(NewsGrpcExceptionCode.GOT_ISSUE),
    );
  }
}
