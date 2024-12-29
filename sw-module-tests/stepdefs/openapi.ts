import { Given, After } from '@cucumber/cucumber';

import { Configuration, DefaultApi } from '../../generated';
import { AxiosResponse } from 'axios';

const apiConfig = new Configuration({
    basePath: 'http://localhost:8080',
});

const apiClient = new DefaultApi(apiConfig);

Given('a search for a movie with the title {string} is made', async (title) => {
    await apiClient.searchMovie(title);
});

After({ tags: "@feature:pollquery" }, async () => {
    await apiClient.clearTestEnv();
});

interface MovieQueue {
    queued_movies: string[]; // oder eine spezifische Typisierung, wenn du die Elemente im Array spezifizieren möchtest
}

Given('the queued movies are empty', async () => {

    // Beispiel für die Anpassung des Response-Typs in der Anfrage
    const result = await apiClient.getMovieQueryList() as unknown as AxiosResponse<MovieQueue>;

    if (!result.data) {
        throw new Error("No data received.");
    }

    // Wenn result.data den richtigen Typ hat, verwende es
    const queue: MovieQueue = result.data;
    if (queue.queued_movies.length !== 0) {
        throw new Error(`Queued Movie List for Poll tracking is NOT empty.\n ${JSON.stringify(result.data)}`);
    }
});