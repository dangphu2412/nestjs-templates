import dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../../user';
import { Role } from '../../authorization';
import { Menu } from '../../menu';

dotenv.config();

const isNotProd = process.env.NODE_ENV !== 'production';

export const connectionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  entities: [User, Role, Menu],
  synchronize: isNotProd,
  logging: false,
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
