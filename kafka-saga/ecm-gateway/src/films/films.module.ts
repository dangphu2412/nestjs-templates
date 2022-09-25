import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FILMS_PACKAGE_NAME, protobufPackage } from './proto/films.grpc';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILMS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, 'proto/films.proto'),
        },
      },
    ]),
  ],
  controllers: [FilmsController],
})
export class FilmsModule {}
