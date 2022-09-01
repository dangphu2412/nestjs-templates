import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { NewsModule } from './news/news.module';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [SharedModule, NewsModule, NotificationModule],
})
export class AppModule {}
