import { Metadata } from '@grpc/grpc-js';
import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FilmListingQuery,
  Films,
  FILMS_PACKAGE_NAME,
  FILMS_SERVICE_NAME,
  FilmsServiceClient,
} from './proto/films.grpc';

@Controller({
  path: 'films',
  version: '1',
})
export class FilmsController implements OnModuleInit {
  private filmsService: FilmsServiceClient;

  constructor(
    @Inject(FILMS_PACKAGE_NAME)
    private filmsClientGrpc: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.filmsService =
      this.filmsClientGrpc.getService<FilmsServiceClient>(FILMS_SERVICE_NAME);
  }

  @Get()
  findAll(@Query() query: FilmListingQuery): Observable<Films> {
    const metadata = new Metadata();

    return this.filmsService.findAll(query, metadata);
  }
}
