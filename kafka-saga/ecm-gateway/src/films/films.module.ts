import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FILMS_PACKAGE_NAME } from './proto/films.grpc';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'films',
        transport: Transport.GRPC,
        options: {
          package: FILMS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/films.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [FilmsController],
})
export class FilmsModule {}
