import express, { Express, Request, Response } from 'express';
import { ServiceLocator } from './servicelocator/servicelocator';
import { MovieService } from './servicelocator/movie_service';
import { getComponentClass } from './servicelocator/helper';

import { getMovie, searchForMovie } from './services/movie_search';
import { addToPollQuery, deleteFromPollQuery } from './services/pollquery';

import { MovieList, PollResult } from './types';

import dotenv from 'dotenv';
import { Movie } from './movie';
import { getAllPolls, pollForMovie } from './services/poller';
dotenv.config();

// get service id
const componentName = process.env.COMPONENT || 'omdb'; // Fallback to "omdb"
// get port to bind on web service
const port = Number(process.env.PORT) || 8080;

const debug = process.env.DEBUG || 'PROD'; // Fallback to "omdb"


const webApp = express();
const servicelocator: ServiceLocator = new ServiceLocator();

const version = '0.0';

// data, could be saved in a database.
const movieList: MovieList = new Map<string, Movie>();
const pollResult: PollResult = new Map<string, number>();

function initializeListener(webApp: Express, port: number): void {
    // prints service information
    webApp.get('/', (req: Request, res: Response) => {
        res.send(`This is JAMP (Just A MoviePoller) REST API, Version ${version}`);
    });

    // ########## Movie Data ##########

    // get the poll score for a movie
    webApp.get('/search', (req: Request, res: Response) => {
        searchForMovie(req, res, servicelocator, movieList);
    });

    // gets movie data
    webApp.get('/movie/:id', (req: Request, res: Response) => {
        getMovie(req, res, movieList);
    });

    // ########## Poll Query Management ##########

    // returns the poll query
    webApp.get('/pollquery', (req: Request, res: Response) => {
        const keys = Array.from(pollResult.keys());
        res.status(200).send(JSON.stringify({ "queued_movies": keys }));
    });

    // queues movies to the poll query
    webApp.post('/pollquery', (req: Request, res: Response) => {
        addToPollQuery(req, res, pollResult, movieList);
    });

    // deletes movies from the poll query
    webApp.delete('/pollquery', (req: Request, res: Response) => {
        deleteFromPollQuery(req, res, pollResult);
    });

    // ########## Poll On Movies ##########

    // increments the movie poll score
    webApp.post('/moviepoll/:id', (req: Request, res: Response) => {
        pollForMovie(req, res, pollResult);
    });

    // gets poll score for one movie
    webApp.get('/moviepoll/:id', (req: Request, res: Response) => {
        getAllPolls(req, res, pollResult);
    });

    // gets poll score for all movies
    webApp.get('/moviepoll', (req: Request, res: Response) => {
        res.status(200).send(Object.fromEntries(pollResult));
    });

    if (debug == "TEST") {
        // deletes everything poll
        webApp.delete('/', (req: Request, res: Response) => {
            movieList.clear();
            pollResult.clear();
            res.status(200).send("data was deleted for clear tests environments");
        });
    }


    // ########## Listener ##########

    // listen for requests
    webApp.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// start server

getComponentClass(componentName)
    .then((ComponentClass) => {
        const componentInstance = new ComponentClass();
        console.log('Loaded component:', componentInstance);

        if (!(componentInstance instanceof MovieService)) {
            throw new Error('componentInstance is not a implementation of MovieService.');
        }

        servicelocator.subscribe(componentInstance);
    })
    .catch((error) => console.error(error));

initializeListener(webApp, port);
