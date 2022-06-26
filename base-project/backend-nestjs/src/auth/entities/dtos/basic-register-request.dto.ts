import { IsString } from 'class-validator';

export class BasicRegisterRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
