import { NewsService } from './clients/news.service';
import { Inject } from '@nestjs/common';
import { News } from './proto/news.grpc';
import {
  NotificationService,
  NotificationServiceToken,
} from '../notifications/clients/send-mail.interface';

export class NewsServiceImpl implements NewsService {
  constructor(
    @Inject(NotificationServiceToken)
    private readonly notificationService: NotificationService,
  ) {}

  findAll(): News {
    return {
      data: [],
    };
  }

  sendMaintenanceEmailToCustomers() {
    const receivers = ['test@gmail.com'];
    this.notificationService.sendMaintenanceEmailToCustomers(receivers);
  }
}
