import { MovieService } from './movie_service';
import { Movie } from '../movie';

// A Component for the service Locator to use in a test environment
// It only serves test data
export class MockComponent extends MovieService {
    async searchMovieTitle(title: string): Promise<Movie[]> {
        // Test Movies
        const movies: Movie[] = [
            {
                id: 'tt1',
                title: 'Grinch',
                year: 2018,
                descr: 'the reclusive green Grinch decides to ruin Christmas for the cheery citizens of Whoville. Reluctantly joined by his hapless dog, Max, the Grinch comes down from his mountaintop home and ...',
                rating: '4.9',
                poster: 'https://test.com/test.jpg'
            },
            {
                id: 'tt2',
                title: 'The Nightmare Before Christmas',
                year: 1993,
                descr: 'Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home causes confusion.',
                rating: '4.8',
                poster: 'https://test.com/test2.jpg'
            },
            {
                id: 'tt3',
                title: 'Home Alone',
                year: 1990,
                descr: 'An eight-year-old troublemaker must protect his house from a pair of burglars when his family is away for the holidays.',
                rating: '5.0',
                poster: 'https://test.com/test3.jpg'
            }
        ];

        const matchingMovies = movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));

        if (matchingMovies.length > 0) {
            return matchingMovies;
        } else {
            throw new Error('No movies found');
        }
    }
}
