import type { Movie } from '../movie';

export abstract class MovieService {
  abstract searchMovieTitle (title: string): Promise<Movie[]>
}
