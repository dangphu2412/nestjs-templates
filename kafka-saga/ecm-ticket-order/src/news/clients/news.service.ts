import { News } from '../proto/news.grpc';

export interface NewsService {
  findAll(): News;
  sendMaintenanceEmailToCustomers();
}
