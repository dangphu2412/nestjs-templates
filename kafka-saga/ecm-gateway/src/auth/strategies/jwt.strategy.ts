import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ModuleConfig } from '../../shared/module-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(moduleConfig: ModuleConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: moduleConfig.getJwtConfig().secret,
    });
  }
}
