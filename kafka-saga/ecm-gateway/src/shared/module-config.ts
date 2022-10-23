import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isBooleanString } from 'class-validator';

@Injectable()
export class ModuleConfig {
  constructor(private readonly configService: ConfigService) {}

  private isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }

  private getNumber(key: string): number {
    const value = Number(this.get(key));

    if (isNaN(value)) {
      throw new Error(key + ' environment variable is not a number');
    }

    return value;
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key).toLowerCase();

    if (!isBooleanString(value)) {
      throw new Error(`${key} environment variable is not a boolean`);
    }

    return Boolean(value);
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private get(key: string): string {
    const value = this.configService.get(key);

    if (!value) {
      throw new Error(`Missing key: ${key} in environment setup`);
    }

    return value;
  }
}
