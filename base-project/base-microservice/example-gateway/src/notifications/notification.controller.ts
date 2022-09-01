import { Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';

@Controller({
  version: '1',
  path: 'notifications',
})
export class NotificationController implements OnModuleInit {
  @Client()
  client: ClientKafka;

  onModuleInit() {
    const requestPatterns = ['notifications'];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Post('/system-maintenance')
  sendMaintenanceEmailToCustomers() {
    this.client.emit('', {});
  }
}
