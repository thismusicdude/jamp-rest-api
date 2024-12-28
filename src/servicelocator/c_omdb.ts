import { MovieService } from './movie_service';
import { Movie } from '../movie';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

export class OmdbComponent extends MovieService {
    async searchMovieTitle(title: string): Promise<Movie[]> {
        const apiKey = process.env.OMDB_KEY;

        if (apiKey === undefined || apiKey === null || apiKey === '') {
            throw new Error('No API Key for OMDB was provided');
        }

        const url = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
        const resp = await axios.get(url);
        const movieData = resp.data;

        // eslint-disable-next-line no-prototype-builtins
        if (movieData.hasOwnProperty('Error')) {
            throw new Error(movieData.Error);
        }

        const movie: Movie = {
            id: movieData.imdbID as string,
            title: movieData.Title as string,
            year: movieData.Year as number || -1,
            descr: movieData.Plot as string || '',
            rating: movieData.imdbRating as string || '',
            poster: movieData.Poster as string || ''
        };
        return [movie];
    }
}
