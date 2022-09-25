/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'news';

export interface Empty {}

export interface News {
  data: New[];
}

export interface New {
  id: number;
  title: string;
  content: string;
}

export const NEWS_PACKAGE_NAME = 'news';

export interface NewsServiceClient {
  findAll(request: Empty, metadata?: Metadata): Observable<News>;

  sendMaintenanceEmailToCustomers(
    request: Empty,
    metadata?: Metadata,
  ): Observable<Empty>;
}

export interface NewsServiceController {
  findAll(
    request: Empty,
    metadata?: Metadata,
  ): Promise<News> | Observable<News> | News;

  sendMaintenanceEmailToCustomers(
    request: Empty,
    metadata?: Metadata,
  ): Promise<Empty> | Observable<Empty> | Empty;
}

export function NewsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'findAll',
      'sendMaintenanceEmailToCustomers',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('NewsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('NewsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const NEWS_SERVICE_NAME = 'NewsService';
