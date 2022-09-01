import { BaseRpcException } from './base-rpc.exception';
import { ClientError } from '../exception-generator';
import { status as RpcStatus } from '@grpc/grpc-js';

export class UnavailableRpcException extends BaseRpcException {
  constructor(error: ClientError) {
    super(error, RpcStatus.UNAVAILABLE);
  }
}
