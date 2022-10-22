import { CreateFilmDto as ICreateFilmDto } from '../../internal/proto/films.grpc';
import { IsEnum, IsString } from 'class-validator';
import { ShowType } from '../../internal/constants/show-type.enum';

export class CreateFilmDto implements ICreateFilmDto {
  @IsString()
  premiereDate: string;

  @IsEnum(ShowType, {
    each: true,
  })
  showTypes: string[];

  @IsString()
  thumbnail: string;

  @IsString()
  timeRange: string;

  @IsString()
  title: string;

  userId: string;
}
