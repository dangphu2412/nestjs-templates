import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';
import {
  NOTIFICATION_CLIENT,
  NOTIFICATION_CLIENT_ID,
  NOTIFICATION_CONSUMER,
} from './clients/send-mail.interface';
import { ConfigService } from '@nestjs/config';
import { EnvLoaderUtils } from '../utils/env-loader.utils';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_CLIENT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const brokers = EnvLoaderUtils.loadMany(
            configService.get('KAFKA_BROKERS'),
          );
          return {
            name: NOTIFICATION_CLIENT,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: NOTIFICATION_CLIENT_ID,
                brokers,
              },
              consumer: {
                groupId: NOTIFICATION_CONSUMER,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
