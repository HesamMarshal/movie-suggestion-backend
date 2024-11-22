import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dtos/movies.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepo: MoviesRepository) {}

  async createMovie(dto: CreateMovieDto) {
    const exists = await this.moviesRepo.findByTmdbId(dto.tmdbId);
    if (exists) return exists;

    const movie = this.moviesRepo.create(dto);
    return this.moviesRepo.save(movie);
  }

  async getTrendingMovies(): Promise<Movie[]> {
    return this.moviesRepo.find({ order: { createdAt: 'DESC' }, take: 20 });
  }

  async searchMovies(query: string): Promise<Movie[]> {
    return this.moviesRepo.find({
      where: { title: query },
      order: { releaseDate: 'DESC' },
    });
  }
}
