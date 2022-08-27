import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
  patchTypeORMTreeRepositoryWithBaseTreeRepository,
} from 'typeorm-transactional-cls-hooked';
import { GrpcExceptionFilter } from './exception/exception.filter';
import { logAppScaffold } from './utils/app.utils';
import { registerPaginationConfig } from './shared/query-shape/pagination/config/register-pagination.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NEWS_PACKAGE_NAME } from './news/proto/news.grpc';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  patchTypeORMTreeRepositoryWithBaseTreeRepository();
  registerPaginationConfig();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: NEWS_PACKAGE_NAME,
        protoPath: join(__dirname, 'news/proto/news.proto'),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new GrpcExceptionFilter());

  await app.listen();

  logAppScaffold(app);
}

bootstrap();
