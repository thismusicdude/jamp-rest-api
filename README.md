# JAMP (Just A MoviePoller) REST API

This project provides a REST API for managing movie polls. Below is an overview of the available endpoints and their functionality.

---

## Endpoints

### General
- **`GET /`**  
  Returns service information, including the current API version.

---

### Movie Data
- **`GET /search`**  
  Searches for a movie by title and adds the results to the internal movie list.  
  **Query Parameters**:  
  - `title` (string): The movie title to search for.  

- **`GET /movie/:id`**  
  Retrieves data for a specific movie by its ID.  
  **Response**:  
  - The movie's data if found, or a 404 error if the movie does not exist.

---

### Poll Query Management
- **`GET /pollquery`**  
  Lists all movies queued in the poll query.  

- **`POST /pollquery`**  
  Adds a movie to the poll query.  
  **Query Parameters**:  
  - `id` (string): The ID of the movie to add.  
  **Responses**:  
  - **200**: Movie successfully added or already queued.  
  - **404**: Movie not found in the movie list.  

- **`DELETE /pollquery`**  
  Removes a movie from the poll query.  
  **Query Parameters**:  
  - `id` (string): The ID of the movie to remove.  
  **Responses**:  
  - **200**: Movie successfully removed.  
  - **404**: Movie not found in the poll query.  

---

### Poll on Movies
- **`POST /moviepoll/:id`**  
  Increments the poll score for a specific movie.  
  **Responses**:  
  - **200**: Poll score incremented successfully.  
  - **404**: Movie not found in the poll query.  

- **`GET /moviepoll/:id`**  
  Retrieves the poll score for a specific movie.  
  **Response**:  
  - **200**: Returns the poll score.  
  - **404**: Movie not found in the poll query.  

- **`GET /moviepoll`**  
  Retrieves the poll scores for all movies.  
  **Response**:  
  - **200**: Returns all poll scores.

---

## .env File
Here’s the section for your README in English, updated to reflect that the `COMPONENT` can be either "omdb" or "mock":

---

## Configuring the `.env` File

To configure the environment variables for the application, you need to create a `.env` file in the project directory. This file contains important settings that the application will use during runtime. The `.env` file should contain the following variables:

```env
COMPONENT="<component-name>"
OMDB_KEY="<OMDB key>"
DEBUG="<mode>"
```

### Variable Explanations:

- **`COMPONENT`**: Specifies the name of the API component being used. It can either be `omdb` for using the OMDB API or `mock` for using mock data. 
- **`OMDB_KEY`**: Your personal API key for accessing the OMDB API. Replace `<OMDB key>` with your actual API key.
- **`DEBUG`**: Controls the debug mode. Set the value to `"TEST"` if you are running the application in a test environment. This enables a new endpoint to clear all inner data.

---

## Setup
1. Clone the repository.
2. Install dependencies via `npm install`.
3. Start the server: `npm start`.

---

## Testing
1. All of the Setup steps in a separate shell
2. Generate test environment: `npm run generate-tests`
3. Start tests: `npm test`



## License
This project is licensed under the MIT License.