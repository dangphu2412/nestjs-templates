import { Module } from '@nestjs/common';
import { NotificationServiceImpl } from './notification.service';

@Module({
  providers: [NotificationServiceImpl],
})
export class NotificationModule {}
