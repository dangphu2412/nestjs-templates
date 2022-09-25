import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [SharedModule, FilmsModule],
})
export class AppModule {}
