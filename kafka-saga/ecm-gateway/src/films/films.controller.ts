import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateFilmDto,
  Empty,
  FilmListingQuery,
  Films,
  FILMS_PACKAGE_NAME,
  FILMS_SERVICE_NAME,
  FilmsServiceClient,
} from './proto/films.grpc';
import { CurrentUser, Identified } from '../auth/decorators';
import { createUserMetadata } from '../auth/factories/user-metadata.factory';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

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

  onModuleInit(): void {
    this.filmsService =
      this.filmsClientGrpc.getService<FilmsServiceClient>(FILMS_SERVICE_NAME);
  }

  @ApiOkResponse()
  @Get()
  findAll(@Query() query: FilmListingQuery): Observable<Films> {
    return this.filmsService.findAll(query);
  }

  @ApiNoContentResponse()
  @Identified
  @Post()
  createFilm(
    @Body() createFilmDto: CreateFilmDto,
    @CurrentUser('userId') userId: string,
  ): Observable<Empty> {
    const metadata = createUserMetadata(userId);

    return this.filmsService.createFilm(createFilmDto, metadata);
  }
}
