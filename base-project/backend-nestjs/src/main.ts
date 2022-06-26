import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ClientExceptionFilter } from './exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ClientExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port ?? 3000);
}

bootstrap();
