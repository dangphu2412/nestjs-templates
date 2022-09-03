import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  NotificationService,
  SendMailMessage,
} from './clients/send-mail.interface';
import { SEND_MAIL_TOPIC } from './constants/subscribe-topic.constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  @MessagePattern(SEND_MAIL_TOPIC)
  sendMaintenanceEmailToCustomers(
    @Payload() receivers: SendMailMessage[],
  ): void {
    console.log(receivers);
  }
}
