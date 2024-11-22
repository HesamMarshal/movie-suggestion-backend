import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { HttpModule } from '../http/http.module';
import { MoviesService } from './services/movies.service';
import { TmdbService } from './services/tmdb.service';
import { MoviesRepository } from './repositories/movies.repository';
import { MoviesController } from './controllers/movies.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule, // Include global HttpModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService, TmdbService, MoviesRepository],
  // exports: [TmdbService],
})
export class MoviesModule {}
