import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesRepository extends Repository<Movie> {
  constructor(
    @InjectRepository(Movie) private readonly repo: Repository<Movie>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findByTmdbId(tmdbId: number): Promise<Movie | undefined> {
    return this.repo.findOneBy({ tmdbId });
  }
}
