import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../entities/jwt-payload';
import { ModuleConfigService } from '../../shared/services/module-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(moduleConfigService: ModuleConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: moduleConfigService.getJwtConfig().secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
