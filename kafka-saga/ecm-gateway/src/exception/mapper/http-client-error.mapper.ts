import { Mapper } from '../../core/client/mapper.interface';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { ClientError } from '../entities/exception.types';
import { SystemExceptionClientCode } from '../exception-client-code.constant';

export class HttpClientErrorMapper
  implements Mapper<HttpException, ClientError>
{
  from(httpException: HttpException): ClientError {
    if (httpException instanceof UnauthorizedException) {
      return SystemExceptionClientCode.UNAUTHORIZED;
    }

    return SystemExceptionClientCode.GATEWAY_CANNOT_HANDLE;
  }
}
