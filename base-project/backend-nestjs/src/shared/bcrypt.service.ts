import { hash, compare, genSalt } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptService {
  private readonly saltRounds: number;

  constructor(configService: ConfigService) {
    this.saltRounds = parseInt(configService.get<string>('SALT_ROUNDS', '10'));
  }

  public async hash(data: string | Buffer) {
    const salt = await genSalt(this.saltRounds);
    return hash(data, salt);
  }

  public async compare(data: string, encrypted: string | Buffer) {
    return compare(encrypted, data);
  }
}
