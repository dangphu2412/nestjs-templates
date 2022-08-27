import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class ClientExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(ClientExceptionFilter.name);
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception.getError());
  }
}
