import { EntityRepository, Repository } from 'typeorm';
import { Film } from '../clients/entities/film.entity';

@EntityRepository(Film)
export class FilmRepository extends Repository<Film> {}
