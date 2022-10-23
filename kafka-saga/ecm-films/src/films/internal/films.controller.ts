import { Controller, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FilmsService } from '../clients';
import {
  Empty,
  Films,
  FILMS_SERVICE_NAME,
  FilmsServiceController,
  FilmsServiceControllerMethods,
} from './proto/films.grpc';
import { CreateFilmDto, FilmListingQueryDto } from '../clients/dtos';
import { FilmListing } from '../clients/types/film-listing.types';
import { FilmsMapper } from './mappers/films.mapper';
import { Metadata } from '@grpc/grpc-js';
import { UserMetadataPipe } from '../../auth/pipes/user-metadata.pipe';

@Controller()
@FilmsServiceControllerMethods()
export class FilmsController implements FilmsServiceController {
  constructor(
    @Inject(FILMS_SERVICE_NAME)
    private readonly filmsService: FilmsService,
    private readonly filmsMapper: FilmsMapper,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(query: FilmListingQueryDto): Observable<Films> {
    return from(this.filmsService.find(query)).pipe(
      map<FilmListing, Films>(this.filmsMapper.toFilms(query)),
    );
  }

  @UsePipes(ValidationPipe, UserMetadataPipe)
  async createFilm(
    createFilmDto: CreateFilmDto,
    metadata?: Metadata,
  ): Promise<Empty> {
    createFilmDto.userId = metadata.get('userId')[0] as string;

    await this.filmsService.create(createFilmDto);

    return {};
  }
}
