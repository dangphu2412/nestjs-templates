import { HttpException } from '@nestjs/common';
import { isObservable } from 'rxjs';
import { AllExceptionsFilter } from '../exception.filter';
import { BaseRpcException } from '../rpc/base-rpc.exception';
import { AlreadyExistsRpcException } from '../rpc/already-exists-rpc.exception';

describe('ClientExceptionFilter', () => {
  let filter: AllExceptionsFilter;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('filter catch method should work', () => {
    it('should handle others exception success', () => {
      const exception: HttpException = new HttpException(
        {
          errorCode: 'CLIENT_CODE',
          message: 'test',
        },
        200,
      );

      expect(isObservable(filter.catch(exception))).toBeTruthy();
    });

    it('should handle rpc exception success', () => {
      const exception: BaseRpcException = new AlreadyExistsRpcException({
        errorCode: 'CLIENT_CODE',
        message: 'test',
      });

      expect(filter.catch(exception)).toBeUndefined();
    });
  });
});
