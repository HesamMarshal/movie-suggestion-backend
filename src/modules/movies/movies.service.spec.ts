import { Test, TestingModule } from '@nestjs/testing';
import { MoviesRepository } from './repositories/movies.repository';
import { MoviesService } from './services/movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MoviesRepository,
          useValue: {
            findByTmdbId: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repo = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should create a new movie if it does not exist', async () => {
    jest.spyOn(repo, 'findByTmdbId').mockResolvedValue(null);
    // jest.spyOn(repo, 'save').mockResolvedValue({ id: 1, title: 'Test Movie' });

    const dto = { title: 'Test Movie', tmdbId: 123 } as any;
    const result = await service.createMovie(dto);

    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, title: 'Test Movie' });
  });

  it('should return trending movies', async () => {
    const movies = [{ id: 1, title: 'Test Movie' }];
    // jest.spyOn(repo, 'find').mockResolvedValue(movies);

    const result = await service.getTrendingMovies();
    expect(result).toEqual(movies);
  });
});
