import { Injectable, PipeTransform } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { isUUID } from 'class-validator';
import { InvalidArgumentRpcException } from '../../exception/rpc/invalid-argument-rpc.exception';

@Injectable()
export class UserMetadataPipe implements PipeTransform<Metadata> {
  transform(value: Metadata): any {
    if (!(value instanceof Metadata)) {
      return value;
    }

    const userId = value.get('userId')?.[0];

    if (!userId || Buffer.isBuffer(userId) || !isUUID(value)) {
      throw new InvalidArgumentRpcException({
        errorCode: 'INVALID_USER_METADATA',
        message: `Invalid userId format. Current value is ${userId} and type is ${typeof userId}. Expected to be string`,
      });
    }

    return value;
  }
}
