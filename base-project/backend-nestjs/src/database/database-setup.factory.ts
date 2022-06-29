import { ModuleFactory } from '../core/client/app-factory.interface';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Role } from '../authorization/entities/role.entity';

export class DatabaseSetupFactory implements ModuleFactory {
  initialize(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isNotProd = configService.get('NODE_ENV') !== 'production';
        const ROOT_DATABASE_MODULE_DIR = 'src/database';
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User, Role],
          synchronize: isNotProd,
          logging: isNotProd,
          migrations: [`${ROOT_DATABASE_MODULE_DIR}/migrations/*.ts`],
          cli: {
            migrationsDir: `${ROOT_DATABASE_MODULE_DIR}/migrations`,
            subscribersDir: `${ROOT_DATABASE_MODULE_DIR}/subscribers`,
          },
        };
      },
    });
  }
}
