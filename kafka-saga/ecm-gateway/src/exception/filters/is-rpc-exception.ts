import { RpcException } from '../entities/exception.types';

export function isRpcException(exception: any): exception is RpcException {
  return (
    exception.code &&
    exception.details &&
    exception.message &&
    exception.metadata
  );
}
