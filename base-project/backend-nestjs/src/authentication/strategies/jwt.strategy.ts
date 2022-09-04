import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../entities/jwt-payload';
import { ModuleConfig } from '../../shared/services/module-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(moduleConfig: ModuleConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: moduleConfig.getJwtConfig().secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
