import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FILMS_SERVICE_NAME } from './proto/films.grpc';
import { FilmsServiceImpl } from './films.service';
import { FilmsController } from './films.controller';
import { FilmRepository } from './films.repository';
import { FilmsMapper } from './mappers/films.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([FilmRepository])],
  controllers: [FilmsController],
  providers: [
    {
      provide: FILMS_SERVICE_NAME,
      useClass: FilmsServiceImpl,
    },
    FilmsMapper,
  ],
})
export class FilmsModule {}
