import { Module } from '@nestjs/common';
import { NEWS_PACKAGE_NAME, protobufPackage } from './proto/news.grpc';
import { NewsController } from './news.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NEWS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, 'proto/news.proto'),
        },
      },
    ]),
  ],
  controllers: [NewsController],
})
export class NewsModule {}
