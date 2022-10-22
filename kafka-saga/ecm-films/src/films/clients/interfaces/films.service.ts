import { FilmListingQuery } from '../../internal/proto/films.grpc';
import { FilmListing } from '../types/film-listing.types';
import { CreateFilmDto } from '../dtos';

export interface FilmsService {
  find(query: FilmListingQuery): Promise<FilmListing>;
  create(dto: CreateFilmDto): Promise<void>;
}
