import { FilmsService } from '../clients';
import { FilmListingQuery } from './proto/films.grpc';
import { FilmListing } from '../clients/types/film-listing.types';
import { FilmRepository } from './films.repository';
import { Injectable, Logger } from '@nestjs/common';
import { CreateFilmDto } from '../clients/dtos';
import { UnavailableRpcException } from '../../exception/rpc/unavailable-rpc.exception';
import { FilmsGrpcExceptionCode } from '../../exception/exception-client-code.constant';
import { SlugGenerator } from '../../utils/slug-generator.utils';

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

  async create(dto: CreateFilmDto): Promise<void> {
    try {
      const newFilm = {
        ...dto,
        slug: SlugGenerator.generate(dto.title),
      };

      await this.filmRepository.insert(newFilm);
    } catch (error) {
      Logger.error(error, FilmsServiceImpl);

      throw new UnavailableRpcException(FilmsGrpcExceptionCode.GOT_ISSUE);
    }
  }
}
