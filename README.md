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

## Setup
1. Clone the repository.
2. Install dependencies via `npm install`.
3. Start the server: `npm start`.

---

## License
This project is licensed under the MIT License.