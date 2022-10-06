import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
  patchTypeORMTreeRepositoryWithBaseTreeRepository,
} from 'typeorm-transactional-cls-hooked';
import { AllExceptionsFilter } from './exception/exception.filter';
import { logAppScaffold } from './utils/app.utils';
import { registerPaginationConfig } from './shared/query-shape/pagination/config/register-pagination.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FILMS_PACKAGE_NAME } from './films/internal/proto/films.grpc';

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
        package: FILMS_PACKAGE_NAME,
        protoPath: join(__dirname, 'films/internal/proto/films.proto'),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();

  logAppScaffold(app);
}

bootstrap();
