import { Film } from '../entities/film.entity';

export type FilmListing = {
  items: Film[];
  totalRecords: number;
};
