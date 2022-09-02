import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  NOTIFICATION_CLIENT,
  NotificationService,
  SendMailMessage,
} from './clients/send-mail.interface';
import { SEND_MAIL_TOPIC } from './constants/subscribe-topic.constants';

export class NotificationServiceImpl
  implements OnModuleInit, NotificationService
{
  constructor(
    @Inject(NOTIFICATION_CLIENT)
    private readonly notificationClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.notificationClient.connect();
  }

  sendMaintenanceEmailToCustomers(receivers: string[]) {
    this.notificationClient.emit(SEND_MAIL_TOPIC, {
      receivers,
    } as SendMailMessage);
  }
}
