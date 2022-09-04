import { Test } from '@nestjs/testing';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { JwtPayload } from '../../entities/jwt-payload';
import { ModuleConfig } from '../../../shared/services/module-config';

describe('AuthController', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ModuleConfig,
          useValue: {
            getJwtConfig: jest.fn().mockReturnValue({ secret: 'jwtKey' }),
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
