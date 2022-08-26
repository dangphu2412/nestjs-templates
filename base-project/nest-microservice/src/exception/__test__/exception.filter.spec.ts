import { ExceptionFilter, HttpException } from '@nestjs/common';
import { ClientExceptionFilter } from '../exception.filter';
import {
  ArgumentsHost,
  HttpArgumentsHost,
} from '@nestjs/common/interfaces/features/arguments-host.interface';
import { isClientException } from '../exception-generator';

jest.mock('../exception-generator', () => ({
  isClientException: jest.fn(),
  generateClientException: jest.fn(),
  generateSystemException: jest.fn(),
}));

jest.mock('../exception-client-code.constant', () => ({
  SystemExceptionClientCode: {
    GOT_ISSUE: {
      errorCode: 'GOT_ISSUE',
      message: 'There is a system error',
    },
  },
}));

describe('ClientExceptionFilter', () => {
  const mockIsClientException = isClientException as unknown as jest.Mock;
  let filter: ExceptionFilter<HttpException>;

  beforeEach(() => {
    filter = new ClientExceptionFilter();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('filter catch method should work', () => {
    it('should handle exception success', () => {
      const exception: HttpException = new HttpException(
        {
          errorCode: 'CLIENT_CODE',
          message: 'test',
        },
        200,
      );
      const mockGetResponse = jest.fn().mockImplementation(() => ({
        status: jest.fn().mockImplementation(() => ({
          send: jest.fn(),
        })),
      }));

      const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
        getResponse: mockGetResponse,
        getRequest: jest.fn(),
      })) as unknown as () => HttpArgumentsHost;

      const argHost = {
        switchToHttp: mockHttpArgumentsHost,
      } as ArgumentsHost;

      filter.catch(exception, argHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse).toBeCalledTimes(1);
    });

    it('should handle client exception success', () => {
      const exception: HttpException = new HttpException(
        {
          errorCode: 'CLIENT_CODE',
          message: 'test',
        },
        400,
      );
      const mockSend = jest.fn();
      const mockStatus = jest.fn().mockImplementation(() => ({
        send: mockSend,
      }));
      const mockGetResponse = jest.fn().mockImplementation(() => ({
        status: mockStatus,
      }));

      const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
        getResponse: mockGetResponse,
      })) as unknown as () => HttpArgumentsHost;

      const argHost = {
        switchToHttp: mockHttpArgumentsHost,
      } as ArgumentsHost;

      mockIsClientException.mockReturnValue(true);

      filter.catch(exception, argHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse().status).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse().status).toBeCalledWith(400);
      expect(
        mockHttpArgumentsHost().getResponse().status().send,
      ).toBeCalledTimes(1);
      expect(
        mockHttpArgumentsHost().getResponse().status().send,
      ).toBeCalledWith({
        errorCode: 'CLIENT_CODE',
        statusCode: 400,
        message: 'test',
      });
    });

    it('should handle other http exception not internal', () => {
      const exception: HttpException = new HttpException(
        {
          message: 'test',
        },
        400,
      );
      const mockSend = jest.fn();
      const mockStatus = jest.fn().mockImplementation(() => ({
        send: mockSend,
      }));
      const mockGetResponse = jest.fn().mockImplementation(() => ({
        status: mockStatus,
      }));

      const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
        getResponse: mockGetResponse,
      })) as unknown as () => HttpArgumentsHost;

      const argHost = {
        switchToHttp: mockHttpArgumentsHost,
      } as ArgumentsHost;

      mockIsClientException.mockReturnValue(false);

      filter.catch(exception, argHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse().status).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse().status).toBeCalledWith(400);
      expect(
        mockHttpArgumentsHost().getResponse().status().send,
      ).toBeCalledTimes(1);
      expect(
        mockHttpArgumentsHost().getResponse().status().send,
      ).toBeCalledWith({
        errorCode: '400',
        statusCode: 400,
        message: 'test',
      });
    });

    it('should handle other http internal exception', () => {
      const exception: HttpException = new HttpException(
        {
          message: 'test',
        },
        500,
      );
      const mockSend = jest.fn();
      const mockStatus = jest.fn().mockImplementation(() => ({
        send: mockSend,
      }));
      const mockGetResponse = jest.fn().mockImplementation(() => ({
        status: mockStatus,
      }));

      const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
        getResponse: mockGetResponse,
      })) as unknown as () => HttpArgumentsHost;

      const argHost = {
        switchToHttp: mockHttpArgumentsHost,
      } as ArgumentsHost;

      mockIsClientException.mockReturnValue(false);

      filter.catch(exception, argHost);

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse().status).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost().getResponse().status).toBeCalledWith(500);
      expect(
        mockHttpArgumentsHost().getResponse().status().send,
      ).toBeCalledTimes(1);
      expect(
        mockHttpArgumentsHost().getResponse().status().send,
      ).toBeCalledWith({
        errorCode: 'GOT_ISSUE',
        statusCode: 500,
        message: 'There is a system error',
      });
    });
  });
});
