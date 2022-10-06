import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  private isLocal() {
    return this.configService.get('NODE_ENV') === 'local';
  }

  private getNumber(key: string): number {
    const value = Number(this.get(key));

    if (isNaN(value)) {
      throw new Error(key + ' environment variable is not a number');
    }

    return value;
  }

  private getMany(key: string): string[] {
    return this.getString(key).split(',');
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new Error(`Missing key: ${key} in environment setup`);
    }

    return value;
  }

  getGoogleOAuthClientId() {
    return this.getString('GOOGLE_OAUTH_CLIENT_ID');
  }

  getJwtSecret() {
    return this.getString('JWT_SECRET');
  }
}
