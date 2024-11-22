import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  overview: string;

  @Column()
  releaseDate: string;

  @Column()
  posterPath: string;

  @Column()
  tmdbId: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 'movie' })
  mediaType: string; // "movie" or "tv"

  @CreateDateColumn()
  createdAt: Date;
}
