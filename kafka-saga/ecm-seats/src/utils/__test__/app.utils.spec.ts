import { extractOrigins } from '../app.utils';

describe('App Utils', () => {
  describe('test extractOrigins', () => {
    it('should return *', () => {
      expect(extractOrigins(undefined)).toEqual('*');
    });

    it('should return array of domains', () => {
      expect(extractOrigins('domain1,domain2')).toEqual(['domain1', 'domain2']);
    });
  });
});
