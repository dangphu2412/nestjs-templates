import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { AppConfig } from '../../shared/app-config';
import { promisify } from 'util';

@Injectable()
export class JwtService {
  private readonly secret: string;

  constructor(appConfig: AppConfig) {
    this.secret = appConfig.getJwtSecret();
  }

  sign(payload: string | object | Buffer): Promise<string> {
    const signJwt = promisify(sign);

    return signJwt(payload, this.secret) as Promise<string>;
  }

  decode(token: string) {
    return new Promise<JwtPayload>((resolve, reject) => {
      verify(token, this.secret, (err, payload) => {
        if (err) {
          return reject(err);
        }

        if (!payload) {
          throw new Error('');
        }

        return resolve(payload as JwtPayload);
      });
    });
  }
}
