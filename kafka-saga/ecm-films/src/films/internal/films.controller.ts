import { Controller, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FilmsService } from '../clients';
import {
  Films,
  FILMS_SERVICE_NAME,
  FilmsServiceController,
  FilmsServiceControllerMethods,
} from './proto/films.grpc';
import { FilmListingQueryDto } from '../clients/dtos/film-listing-query.dto';
import { FilmListing } from '../clients/types/film-listing.types';
import { FilmsMapper } from './mappers/films.mapper';

@Controller()
@FilmsServiceControllerMethods()
@UsePipes(ValidationPipe)
export class FilmsController implements FilmsServiceController {
  constructor(
    @Inject(FILMS_SERVICE_NAME)
    private readonly filmsService: FilmsService,
    private readonly filmsMapper: FilmsMapper,
  ) {}

  findAll(query: FilmListingQueryDto): Observable<Films> {
    return from(this.filmsService.find(query)).pipe(
      map<FilmListing, Films>(this.filmsMapper.toFilms(query)),
    );
  }
}
