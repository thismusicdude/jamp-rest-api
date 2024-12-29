import type { Movie } from '../movie';

// Abstract class for all movie database components
export abstract class MovieService {
  abstract searchMovieTitle (title: string): Promise<Movie[]>
}
