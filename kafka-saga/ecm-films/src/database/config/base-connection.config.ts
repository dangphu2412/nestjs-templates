import dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Film } from '../../films/clients/entities/film.entity';

dotenv.config();

const isNotProd = process.env.NODE_ENV !== 'production';

export const connectionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  entities: [Film],
  synchronize: isNotProd,
  logging: true,
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
