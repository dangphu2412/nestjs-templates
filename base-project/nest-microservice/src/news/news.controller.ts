import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';

@Controller()
export class HeroesController {
  @GrpcMethod('NewsService', 'FindAll')
  findOne(data: any, metadata: Metadata): any {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
