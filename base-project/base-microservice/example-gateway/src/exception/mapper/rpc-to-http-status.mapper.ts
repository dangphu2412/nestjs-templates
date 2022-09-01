import { Mapper } from '../../core/client/mapper.interface';
import { status as RpcStatus } from '@grpc/grpc-js';
import { HttpStatus } from '@nestjs/common';

export class RpcToHttpStatusMapper implements Mapper<RpcStatus, HttpStatus> {
  from(from: RpcStatus): HttpStatus {
    switch (from) {
      case RpcStatus.OK:
        return HttpStatus.OK;
      case RpcStatus.NOT_FOUND:
      case RpcStatus.UNIMPLEMENTED:
        return HttpStatus.NOT_FOUND;
      case RpcStatus.UNAUTHENTICATED:
        return HttpStatus.UNAUTHORIZED;
      case RpcStatus.PERMISSION_DENIED:
        return HttpStatus.FORBIDDEN;
      case RpcStatus.INVALID_ARGUMENT:
      case RpcStatus.FAILED_PRECONDITION:
      case RpcStatus.OUT_OF_RANGE:
        return HttpStatus.BAD_REQUEST;
      case RpcStatus.UNAVAILABLE:
      case RpcStatus.CANCELLED:
        return HttpStatus.SERVICE_UNAVAILABLE;
      case RpcStatus.ALREADY_EXISTS:
        return HttpStatus.NOT_ACCEPTABLE;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
