import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [DatabaseModule, SharedModule, NotificationModule],
})
export class AppModule {}
