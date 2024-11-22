import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from '../dtos/movies.dto';
import { Movie } from '../entities/movie.entity';
import { MoviesRepository } from '../repositories/movies.repository';
import { TmdbService } from './tmdb.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepo: MoviesRepository,
    private readonly tmdbService: TmdbService,
  ) {}

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

  async fetchAndSaveTrendingMovies(): Promise<void> {
    const trendingMovies = await this.tmdbService.fetchTrendingMovies();
    console.log(trendingMovies);

    const moviesToSave = trendingMovies.results.map((movie) => ({
      title: movie.title || movie.name,
      overview: movie.overview,
      releaseDate: movie.release_date || movie.first_air_date,
      posterPath: movie.poster_path,
      tmdbId: movie.id,
      mediaType: movie.media_type,
      rating: movie.vote_average,
    }));

    for (const movie of moviesToSave) {
      const existingMovie = await this.moviesRepo.findByTmdbId(movie.tmdbId);
      if (!existingMovie) {
        await this.moviesRepo.save(movie);
      }
    }
  }
}
