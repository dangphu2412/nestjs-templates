import { IsString } from 'class-validator';

export class BasicLoginRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
