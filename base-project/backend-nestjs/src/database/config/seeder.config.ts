import { connectionConfig } from './base-connection.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const ROOT_DATABASE_MODULE_DIR = 'src/database';

export default {
  ...connectionConfig,
  migrations: [`${ROOT_DATABASE_MODULE_DIR}/seeders/*.ts`],
  cli: {
    migrationsDir: `${ROOT_DATABASE_MODULE_DIR}/seeders`,
    subscribersDir: `${ROOT_DATABASE_MODULE_DIR}/subscribers`,
  },
  migrationsTableName: 'seeder',
} as TypeOrmModuleOptions;
