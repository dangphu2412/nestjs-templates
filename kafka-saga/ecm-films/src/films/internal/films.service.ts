import { FilmsService } from '../clients';
import { FilmListingQuery } from './proto/films.grpc';
import { FilmListing } from '../clients/types/film-listing.types';
import { FilmRepository } from './films.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsServiceImpl implements FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async find(query: FilmListingQuery): Promise<FilmListing> {
    const films = await this.filmRepository.find();
    const totalRecords = await this.filmRepository.count();

    return {
      items: films,
      totalRecords,
    };
  }
}
