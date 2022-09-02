import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  NOTIFICATION_CLIENT,
  SendMailMessage,
} from './clients/send-mail.interface';
import { SEND_MAIL_TOPIC } from './constants/subscribe-topic.constants';

@Controller({
  version: '1',
  path: 'notifications',
})
export class NotificationController implements OnModuleInit {
  constructor(
    @Inject(NOTIFICATION_CLIENT)
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(SEND_MAIL_TOPIC);
    await this.client.connect();
  }

  @Get('/system-maintenance')
  sendMaintenanceEmailToCustomers() {
    return this.client.send(SEND_MAIL_TOPIC, {
      receivers: ['test1@gmail.com'],
    } as SendMailMessage);
  }
}
