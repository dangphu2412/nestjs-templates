import { Metadata } from '@grpc/grpc-js';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import {
  News,
  NEWS_PACKAGE_NAME,
  NEWS_SERVICE_NAME,
  NewsServiceClient,
} from './proto/news.grpc';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Controller({
  path: 'news',
  version: '1',
})
export class NewsController implements OnModuleInit {
  private newsService: NewsServiceClient;

  constructor(
    @Inject(NEWS_PACKAGE_NAME)
    private newsClientGrpc: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.newsService =
      this.newsClientGrpc.getService<NewsServiceClient>(NEWS_SERVICE_NAME);
  }

  @Get()
  findAll(): Observable<News> {
    console.log(`Calling new controller`);
    const metadata = new Metadata();
    return this.newsService.findAll({}, metadata);
  }
}
