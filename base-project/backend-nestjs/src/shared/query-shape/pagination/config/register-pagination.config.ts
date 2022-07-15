import { ConfigKeys, ConfigRegistry } from '../../config.registry';
import { Logger } from '@nestjs/common';

interface RegisterPaginationConfig {
  defaultSize?: number;
  maxSize?: number;
  defaultPage?: number;
}

export function registerPaginationConfig(): void;
export function registerPaginationConfig(
  config: RegisterPaginationConfig,
): void;
export function registerPaginationConfig(
  config?: RegisterPaginationConfig,
): void {
  const logger = new Logger(registerPaginationConfig.name);

  ConfigRegistry.set(ConfigKeys.MAX_SIZE, config?.maxSize ?? 50);
  ConfigRegistry.set(ConfigKeys.DEFAULT_SIZE, config?.defaultSize ?? 10);
  ConfigRegistry.set(ConfigKeys.DEFAULT_PAGE, config?.defaultPage ?? 1);

  logger.log(
    `Max size for pagination will be: ${ConfigRegistry.get(
      ConfigKeys.MAX_SIZE,
    )}`,
  );
  logger.log(
    `Default pagination size will be: ${ConfigRegistry.get(
      ConfigKeys.DEFAULT_SIZE,
    )}`,
  );
  logger.log(
    `Default page will be: ${ConfigRegistry.get(ConfigKeys.DEFAULT_PAGE)}`,
  );
}
