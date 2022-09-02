import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendMailMessage } from './clients/send-mail.interface';
import { SEND_MAIL_TOPIC } from './constants/subscribe-topic.constants';

@Controller()
export class NotificationController {
  @MessagePattern(SEND_MAIL_TOPIC)
  killDragon(@Payload() message: SendMailMessage): SendMailMessage {
    return message;
  }
}
