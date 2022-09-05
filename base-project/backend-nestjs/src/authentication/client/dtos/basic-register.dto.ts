import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BasicRegisterDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
