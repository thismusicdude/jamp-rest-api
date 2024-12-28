import { Request, Response } from 'express';

export function pollForMovie(req: Request, res: Response, pollResult: Map<string, number>): void {
    const movieId = req.params.id as string;

    if (!pollResult.has(movieId) && movieId !== "") {
        res.sendStatus(404);
    } else {
        const pollRate = pollResult.get(movieId) as number;
        pollResult.set(movieId, pollRate + 1);
        res.sendStatus(200);
    }
}

export function getMoviePolls(req: Request, res: Response, pollResult: Map<string, number>): void {
    const movieId = req.query.id as string;

    if (!pollResult.has(movieId)) {
        res.sendStatus(404);
    } else {
        pollResult.delete(movieId);
        res.sendStatus(200);
    }
}

export function getAllPolls(req: Request, res: Response, pollResult: Map<string, number>): void {
    const movieId = req.query.id as string;

    if (!pollResult.has(movieId)) {
        res.sendStatus(404);
    } else {
        pollResult.delete(movieId);
        res.sendStatus(200);
    }
}