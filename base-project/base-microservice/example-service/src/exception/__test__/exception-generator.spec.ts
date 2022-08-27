import {
  generateClientException,
  generateSystemException,
  isClientException,
} from '../exception-generator';

describe('exception generator', () => {
  describe('test generateClientException', () => {
    it('should generate client exception success with default message', () => {
      const result = generateClientException('ERROR');
      expect(result.errorCode).toEqual('CLIENT_ERROR');
      expect(result.message).toEqual('There is an error');
    });

    it('should generate client exception success with full error format', () => {
      const result = generateClientException({
        errorCode: 'ERROR_2',
        message: 'test',
      });
      expect(result.errorCode).toEqual('CLIENT_ERROR_2');
      expect(result.message).toEqual('test');
    });
  });

  describe('test generateSystemException', () => {
    it('should generate system exception success with default message', () => {
      const result = generateSystemException('ERROR');
      expect(result.errorCode).toEqual('SYS_ERROR');
      expect(result.message).toEqual('There is a system error');
    });

    it('should generate system exception success with correct format', () => {
      const result = generateSystemException({
        errorCode: 'ERROR',
        message: 'test',
      });
      expect(result.errorCode).toEqual('SYS_ERROR');
      expect(result.message).toEqual('test');
    });
  });

  describe('test isClientException', () => {
    it('return true if it is client exception', () => {
      expect(
        isClientException({
          errorCode: 'something',
        }),
      ).toEqual(true);
    });

    it('return true if it is client exception', () => {
      expect(
        isClientException({
          message: 'something',
        }),
      ).toEqual(false);
    });
  });
});
