import { IsJWT, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenewTokensRequestDto {
  @ApiProperty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
