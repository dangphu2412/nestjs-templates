import { FilmListingQuery } from '../../internal/proto/films.grpc';
import { FilmListing } from '../types/film-listing.types';

export interface FilmsService {
  find(query: FilmListingQuery): Promise<FilmListing>;
}
