export type SendMailMessage = {
  receivers: string[];
};

export const NOTIFICATION_CLIENT_ID = 'notification';
export const NOTIFICATION_CONSUMER = 'notification-consumer';

export interface NotificationService {
  sendMaintenanceEmailToCustomers(receivers: SendMailMessage[]): void;
}
