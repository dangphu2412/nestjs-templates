import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class ModuleConfigService {
  constructor(private readonly configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get(key);
    if (!value) {
      throw new Error(`Missing key: ${key} in environment setup`);
    }
    return value;
  }

  private isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }

  getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.get('JWT_SECRET'),
    };
  }
}
