Feature: Search for movies

  Scenario: Search a movie (successful)
    Given a GET request to "http:localhost:8080/search?title=grinch" is made
    When a response was returned
    Then the response should have a status 200
    And the response should have a json
      """
      [
        {
            "id": "tt1",
            "title": "Grinch",
            "year": 2018,
            "descr": "the reclusive green Grinch decides to ruin Christmas for the cheery citizens of Whoville. Reluctantly joined by his hapless dog, Max, the Grinch comes down from his mountaintop home and ...",
            "rating": "4.9",
            "poster": "https://test.com/test.jpg"
        }
      ]
      """

  Scenario: Search a movie (wrong method)
    Given a DELETE request to "http:localhost:8080/search?title=grinch" is made
    When a response was returned
    Then the response should have a status 404