import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateMovieDto } from '../dtos/movies.dto';
import { MoviesService } from '../services/movies.service';
import { TmdbService } from '../services/tmdb.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tmdbService: TmdbService,
  ) {
    console.log('test');
  }

  @Post()
  async createMovie(@Body() dto: CreateMovieDto) {
    return this.moviesService.createMovie(dto);
  }

  @Get('trending')
  async getTrendingMovies() {
    return this.moviesService.getTrendingMovies();
  }

  @Get('fetch-trending')
  async fetchTrendingMovies() {
    await this.moviesService.fetchAndSaveTrendingMovies();
    return { message: 'Trending movies fetched and saved.' };
  }

  @Get('search')
  async searchMovies(@Query('q') query: string) {
    return this.moviesService.searchMovies(query);
  }
}
