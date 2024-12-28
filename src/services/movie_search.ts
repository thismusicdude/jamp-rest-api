import { Request, Response } from 'express';

import { Movie } from '../movie';
import { ServiceLocator } from '../servicelocator/servicelocator';
import { MovieList } from '../types';

export function searchForMovie (req: Request, res: Response, servicelocator: ServiceLocator, movieList: MovieList): void {
  const title = req.query.title as string;
  servicelocator.getService().searchMovieTitle(title).then((movies: Movie[]) => {
    movies.forEach((movie) => {
      movieList.set(movie.id, movie);
    });
    res.send(movies);
  }).catch(
    (error) => {
      res.send(`Error While Search: ${error}`);
    }
  );
}

export function getMovie (req: Request, res: Response, movieList: MovieList): void {
  const movieId = req.params.id;

  if (!movieList.has(movieId)) {
    res.status(404).send({
      msg: 'movie was not found in movie list.'
    });
  } else {
    res.status(200).send(movieList.get(movieId));
  }
}
