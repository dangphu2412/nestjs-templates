import { Test } from '@nestjs/testing';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../entities/jwt-payload';

describe('AuthController', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('jwtKey' as never),
          },
        },
      ],
    }).compile();

    jwtStrategy = moduleRef.get(JwtStrategy);
  });

  describe('JwtStrategy can run normal', () => {
    it('validate return correct payload', () => {
      const payload: JwtPayload = {
        sub: 'id',
      };
      expect(jwtStrategy.validate(payload)).toEqual(payload);
    });
  });
});
