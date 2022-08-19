import { connectionConfig } from './base-connection.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export default {
  ...connectionConfig,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
} as TypeOrmModuleOptions;
