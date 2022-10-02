import { LoginGoogleDto as ILoginGoogleDto } from '../../proto/auth.grpc';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginGoogleDto implements ILoginGoogleDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
