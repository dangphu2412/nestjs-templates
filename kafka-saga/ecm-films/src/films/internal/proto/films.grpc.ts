/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'films';

export interface FilmListingQuery {
  page?: number | undefined;
  size?: number | undefined;
  search: string;
}

export interface Films {
  items: Film[];
  metadata: PaginationMetadata | undefined;
}

export interface Film {
  id: number;
  title: string;
  timeRange: string;
  thumbnail: string;
  premiereDate: string;
  slug: string;
  showTypes: string[];
}

export interface PaginationMetadata {
  page: number;
  size: number;
  totalRecords: number;
  totalPages: number;
}

export interface CreateFilmDto {
  title: string;
  timeRange: string;
  thumbnail: string;
  premiereDate: string;
  showTypes: string[];
}

export interface Empty {}

export const FILMS_PACKAGE_NAME = 'films';

export interface FilmsServiceClient {
  findAll(request: FilmListingQuery, metadata?: Metadata): Observable<Films>;

  createFilm(request: CreateFilmDto, metadata?: Metadata): Observable<Empty>;
}

export interface FilmsServiceController {
  findAll(
    request: FilmListingQuery,
    metadata?: Metadata,
  ): Promise<Films> | Observable<Films> | Films;

  createFilm(
    request: CreateFilmDto,
    metadata?: Metadata,
  ): Promise<Empty> | Observable<Empty> | Empty;
}

export function FilmsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findAll', 'createFilm'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('FilmsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('FilmsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const FILMS_SERVICE_NAME = 'FilmsService';
