import { INestMicroservice, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvLoaderUtils } from './env-loader.utils';

export function extractOrigins(rawConfigString: string | undefined) {
  const ALLOW_ALL_ORIGINS = '*';
  if (!rawConfigString) {
    return ALLOW_ALL_ORIGINS;
  }
  return EnvLoaderUtils.loadMany(rawConfigString);
}

export function logAppScaffold(app: INestMicroservice) {
  const logger: Logger = new Logger('AppBootstrap');
  const configService: ConfigService = app.get(ConfigService);
  const env = configService.get('NODE_ENV');
  const memUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);

  logger.log(`Service auth up`);
  logger.log(`Application is running in ${env} mode`);
  logger.log(
    `Memory usage: ${memUsage} MB -` +
      'CPU usage: ' +
      process.cpuUsage().user / 1000 +
      '%',
  );
}
