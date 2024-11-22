import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async createMovie(@Body() dto: CreateMovieDto) {
    return this.moviesService.createMovie(dto);
  }

  @Get('trending')
  async getTrendingMovies() {
    return this.moviesService.getTrendingMovies();
  }

  @Get('search')
  async searchMovies(@Query('q') query: string) {
    return this.moviesService.searchMovies(query);
  }
}
