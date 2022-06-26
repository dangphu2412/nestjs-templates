import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ClientExceptionFilter } from './exception/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('The App API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ClientExceptionFilter());

  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port ?? 3000);
}

bootstrap();
