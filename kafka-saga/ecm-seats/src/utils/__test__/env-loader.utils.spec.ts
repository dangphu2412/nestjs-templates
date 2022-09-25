import { EnvLoaderUtils } from '../env-loader.utils';

describe('Env loader utils', () => {
  describe('test load env', () => {
    it('should return correct same value', () => {
      expect(EnvLoaderUtils.loadMany('domain1')).toEqual(['domain1']);
    });

    it('should return separate values', () => {
      expect(EnvLoaderUtils.loadMany('domain1,domain2')).toEqual([
        'domain1',
        'domain2',
      ]);
    });

    it('should return separate values even have empty char', () => {
      expect(
        EnvLoaderUtils.loadMany('          domain1,domain2        '),
      ).toEqual(['domain1', 'domain2']);
    });
  });
});
