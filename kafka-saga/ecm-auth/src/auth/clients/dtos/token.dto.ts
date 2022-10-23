import { IsIn, IsString } from 'class-validator';

export class TokenDto {
  @IsIn(['accessToken', 'refreshToken'])
  name: string;

  @IsString()
  value: string;
}
