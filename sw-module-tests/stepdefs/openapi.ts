import { Given, After } from '@cucumber/cucumber';

import { Configuration, DefaultApi } from '../../generated';

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
    queued_movies: string[];
}

Given('the queued movies are empty', async () => {
    await apiClient.getPollList()
        .then((result) => {
            // is a result received
            if (!result || typeof result.data === "undefined") {
                throw new Error("No data received.");
            }

            // map object to interface to get length
            const queue: MovieQueue = result.data;
            const queue_length: number = queue.queued_movies.length;

            if (queue_length !== 0) {
                throw new Error(
                    `Queued Movie List for Poll tracking is NOT empty.\n ${JSON.stringify(queue)}`
                );
            }
        })
        .catch((error) => {
            console.error("Error occurred during movie queue check:", error);
            throw error;
        });
});

Given('a movie with the id {string} is pushed into poll list', async (id) => {
    await apiClient.pushIntoPollList(id)
        .catch((error) => {
            console.error("Error occurred during movie queue check:", error);
            throw error;
        });
});
