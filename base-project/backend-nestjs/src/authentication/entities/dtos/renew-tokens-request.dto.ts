import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenewTokensRequestDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
