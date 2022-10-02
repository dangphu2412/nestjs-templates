import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionConfig } from './config/base-connection.config';

@Module({
  imports: [TypeOrmModule.forRoot(connectionConfig)],
})
export class DatabaseModule {}
