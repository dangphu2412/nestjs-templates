import { connectionConfig } from './base-connection.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const ROOT_DATABASE_MODULE_DIR = 'src/database';

export default {
  ...connectionConfig,
  migrations: [`${ROOT_DATABASE_MODULE_DIR}/migrations/*.ts`],
  cli: {
    migrationsDir: `${ROOT_DATABASE_MODULE_DIR}/migrations`,
    subscribersDir: `${ROOT_DATABASE_MODULE_DIR}/subscribers`,
  },
} as TypeOrmModuleOptions;
