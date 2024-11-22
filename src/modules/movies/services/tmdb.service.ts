import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);

  constructor(private readonly httpService: HttpService) {}

  private get baseUrl(): string {
    return process.env.TMDB_BASE_URL;
  }

  private get apiKey(): string {
    return process.env.TMDB_API_KEY;
  }

  private buildUrl(endpoint: string, params: Record<string, any> = {}): string {
    const queryString = new URLSearchParams({
      ...params,
      api_key: this.apiKey,
    }).toString();
    return `${this.baseUrl}${endpoint}?${queryString}`;
  }

  async fetchTrendingMovies(
    mediaType: 'movie' | 'tv' = 'movie',
    timeWindow: 'day' | 'week' = 'day',
  ): Promise<any> {
    const url = this.buildUrl(`/trending/${mediaType}/${timeWindow}`);
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error fetching trending movies from TMDB: ${error.message}`,
      );
      throw new Error('Failed to fetch trending movies');
    }
  }
}
