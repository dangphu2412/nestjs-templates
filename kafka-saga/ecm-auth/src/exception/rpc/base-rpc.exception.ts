import { RpcException } from '@nestjs/microservices';
import { ClientError } from '../exception-generator';
import { Metadata, status as RpcStatus } from '@grpc/grpc-js';

export abstract class BaseRpcException extends RpcException {
  protected constructor(
    { message, errorCode }: ClientError,
    status: RpcStatus,
  ) {
    const metadata = new Metadata();
    metadata.add('ERROR_MESSAGE', message);
    super({
      code: status,
      details: errorCode,
      metadata,
    });
  }
}
