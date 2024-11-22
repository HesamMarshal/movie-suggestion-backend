import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  overview: string;

  @IsString()
  releaseDate: string;

  @IsString()
  posterPath: string;

  @IsNumber()
  tmdbId: number;

  @IsString()
  mediaType: string;
}
