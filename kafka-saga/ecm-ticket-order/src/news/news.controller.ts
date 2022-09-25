import { Metadata } from '@grpc/grpc-js';
import { Controller, Inject } from '@nestjs/common';
import {
  Empty,
  News,
  NEWS_SERVICE_NAME,
  NewsServiceController,
  NewsServiceControllerMethods,
} from './proto/news.grpc';
import { Observable } from 'rxjs';
import { NewsService } from './clients/news.service';

@Controller()
@NewsServiceControllerMethods()
export class NewsController implements NewsServiceController {
  constructor(
    @Inject(NEWS_SERVICE_NAME)
    private readonly newService: NewsService,
  ) {}

  findAll(
    request: Empty,
    metadata?: Metadata,
  ): Promise<News> | Observable<News> | News {
    return this.newService.findAll();
  }

  sendMaintenanceEmailToCustomers(
    request: Empty,
    metadata?: Metadata,
  ): Promise<Empty> | Observable<Empty> | Empty {
    this.newService.sendMaintenanceEmailToCustomers();
    return {};
  }
}
