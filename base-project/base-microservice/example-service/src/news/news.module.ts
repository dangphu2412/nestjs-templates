import { Module } from '@nestjs/common';
import { NEWS_SERVICE_NAME } from './proto/news.grpc';
import { NewsServiceImpl } from './news.service';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [
    {
      provide: NEWS_SERVICE_NAME,
      useClass: NewsServiceImpl,
    },
  ],
})
export class NewsModule {}
