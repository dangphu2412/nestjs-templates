import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exception/exception.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyHelmet } from '@fastify/helmet';
import compression from 'fastify-compress';
import { logAppScaffold } from './utils/app.utils';
import { registerPaginationConfig } from './shared/query-shape/pagination/config/register-pagination.config';

async function bootstrap() {
  registerPaginationConfig();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: true,
    },
  );
  const config = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('The App API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port ?? 3000);

  logAppScaffold(app);
}

bootstrap();
