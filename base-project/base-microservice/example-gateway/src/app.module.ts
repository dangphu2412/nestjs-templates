import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [SharedModule, NewsModule],
})
export class AppModule {}
