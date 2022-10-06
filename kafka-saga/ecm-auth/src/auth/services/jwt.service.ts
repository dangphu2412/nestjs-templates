import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AppConfig } from '../../shared/app-config';

@Injectable()
export class JwtService {
  private readonly secret: string;

  constructor(appConfig: AppConfig) {
    this.secret = appConfig.getJwtSecret();
  }

  sign(payload: string | object | Buffer) {
    return Promise.resolve(sign(payload, this.secret));
  }
}
