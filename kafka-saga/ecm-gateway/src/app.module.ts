import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { FilmsModule } from './films/films.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, FilmsModule, AuthModule],
})
export class AppModule {}
