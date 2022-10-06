import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { FilmsModule } from './films/internal/films.module';

@Module({
  imports: [DatabaseModule, SharedModule, FilmsModule],
})
export class AppModule {}
