import { Request, Response } from 'express';
import { MovieList, PollResult } from '../types';
import { Movie } from '../movie';

export function addToPollQuery (req: Request, res: Response, pollResult: PollResult, movieList: MovieList): void {
  const movieId = req.query.id as string;
  const addedMovie: Movie | undefined = movieList.get(movieId);

  if (addedMovie === undefined) {
    res.status(404).send({
      msg: 'movie was not found in movie list. search first for the movie to let me know that it exists.'
    });
  } else if (pollResult.has(movieId)) {
    res.status(200).send({
      msg: 'movie already queued'
    });
  } else {
    pollResult.set(movieId, 0);
    res.status(200).send({
      msg: `movie ${addedMovie.title} added to poll list`
    });
  }
}

export function deleteFromPollQuery (req: Request, res: Response, pollResult: Map<string, number>): void {
  const movieId = req.query.id as string;

  if (!pollResult.has(movieId)) {
    res.sendStatus(404);
  } else {
    pollResult.delete(movieId);
    res.sendStatus(200);
  }
}
