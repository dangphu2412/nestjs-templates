import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [DatabaseModule, SharedModule, NewsModule],
})
export class AppModule {}
