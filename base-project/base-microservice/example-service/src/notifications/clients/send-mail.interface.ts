export type SendMailMessage = {
  receivers: string[];
};

export const NOTIFICATION_CLIENT = 'NOTIFICATION_CLIENT';

export const NOTIFICATION_CLIENT_ID = 'notification';
export const NOTIFICATION_CONSUMER = 'notification-consumer';

export const NotificationServiceToken = 'NotificationServiceToken';
export interface NotificationService {
  sendMaintenanceEmailToCustomers(receivers: string[]): void;
}
