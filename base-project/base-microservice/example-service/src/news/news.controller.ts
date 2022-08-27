import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import {
  Empty,
  News,
  NewsServiceController,
  NewsServiceControllerMethods,
} from './proto/news.grpc';
import { Observable } from 'rxjs';

@Controller()
@NewsServiceControllerMethods()
export class NewsController implements NewsServiceController {
  findAll(
    request: Empty,
    metadata?: Metadata,
  ): Promise<News> | Observable<News> | News {
    return undefined;
  }
}
