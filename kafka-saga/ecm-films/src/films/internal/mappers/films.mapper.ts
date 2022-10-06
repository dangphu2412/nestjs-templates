import { Films } from '../proto/films.grpc';
import { FilmListing } from '../../clients/types/film-listing.types';
import { createPaginationMetadata } from '../../../shared/query-shape/pagination/factories/pagination-metadata.factory';
import { FilmListingQueryDto } from '../../clients/dtos/film-listing-query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsMapper {
  toFilms(query: FilmListingQueryDto) {
    return ({ items, totalRecords }: FilmListing): Films => {
      return {
        items: [
          ...items.map((item) => {
            return {
              ...item,
              premiereDate: item.premiereDate.toLocaleDateString(),
              timeSlots: [],
            };
          }),
        ],
        metadata: createPaginationMetadata({
          page: query.page,
          size: query.size,
          totalRecords,
        }),
      };
    };
  }
}
