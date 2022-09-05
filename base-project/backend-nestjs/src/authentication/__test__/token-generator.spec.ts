import { Test } from '@nestjs/testing';
import { TokenGeneratorImpl } from '../internal/token-generator';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenGenerator, TokenGeneratorToken } from '../client';

describe('TokenGenerator', () => {
  let tokenGenerator: TokenGenerator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TokenGeneratorToken,
          useClass: TokenGeneratorImpl,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest
              .fn()
              .mockImplementation(
                (
                  _: string | object | Buffer,
                  options?: JwtSignOptions,
                ): Promise<string> => {
                  if (options.expiresIn === '1m') {
                    return Promise.resolve('accessToken');
                  }

                  if (options.expiresIn === '1h') {
                    return Promise.resolve('refreshToken');
                  }
                  return Promise.resolve('');
                },
              ),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              return 'ACCESS_TOKEN_EXPIRATION' === key ? '1m' : '1h';
            },
          },
        },
      ],
    }).compile();
    tokenGenerator = moduleRef.get(TokenGeneratorToken);
  });

  describe('generate', () => {
    it('should be called success with userId param', async () => {
      const result = [
        {
          name: 'accessToken',
          type: 'Bearer ',
          value: 'accessToken',
        },
        {
          name: 'refreshToken',
          type: 'Bearer ',
          value: 'refreshToken',
        },
      ];

      expect(await tokenGenerator.generate('userId')).toEqual(result);
    });

    it('should be called success with userId, providedRefreshToken params', async () => {
      const result = [
        {
          name: 'accessToken',
          type: 'Bearer ',
          value: 'accessToken',
        },
        {
          name: 'refreshToken',
          type: 'Bearer ',
          value: 'existedToken',
        },
      ];

      expect(await tokenGenerator.generate('userId', 'existedToken')).toEqual(
        result,
      );
    });
  });
});
