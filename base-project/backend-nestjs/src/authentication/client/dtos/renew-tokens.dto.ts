import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenewTokensDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
