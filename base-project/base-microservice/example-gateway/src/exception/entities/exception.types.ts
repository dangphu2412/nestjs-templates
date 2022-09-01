import { Metadata, status as RpcStatus } from '@grpc/grpc-js';

export interface RpcException extends Error {
  code: RpcStatus;
  details: string;
  metadata: Metadata;
}

export interface ClientError {
  errorCode: string;
  message?: string;
}
