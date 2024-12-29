  @feature:pollquery
  Feature: Pollquery

    Background: Search a movie to be able to inject it
      Given a search for a movie with the title "Grinch" is made
      And the queued movies are empty

    
    # Select Movie for a poll
    Scenario: Selects a movie for a poll
      # push a random id into pollquery
      Given a new POST request to "http:localhost:8080/pollquery?id=<id>" is made
      When a response was returned
      Then the response should have a status <errorCode>
      Examples:
        | id          | errorCode |
        | undefinedId |       404 |
        | tt1         |       200 |
    
    # Retrieve Poll Query
    Scenario: Retrieve no movie in poll query
      # check pollquery after adding data into it
      And a new GET request to "http:localhost:8080/pollquery" is made
      When a response was returned
      Then the response should have a status 200
      And the response should have a json
        """
        { "queued_movies": [] }
        """

    Scenario: Retrieve queued Movie
      # push grinch into pollquery
      Given a movie with the id "tt1" is pushed into poll list
      # check pollquery after adding data into it
      And a new GET request to "http:localhost:8080/pollquery" is made
      When a response was returned
      Then the response should have a status 200
      And the response should have a json
        """
        { "queued_movies": ["tt1"] }
        """

    Scenario: Retrieve multiple queued Movies
      Given a search for a movie with the title "Home" is made
      Given a search for a movie with the title "Nightmare" is made
      # push grinch into pollquery
      Given a movie with the id "tt1" is pushed into poll list
      Given a movie with the id "tt2" is pushed into poll list
      Given a movie with the id "tt3" is pushed into poll list
      # check pollquery after adding data into it
      And a new GET request to "http:localhost:8080/pollquery" is made
      When a response was returned
      Then the response should have a status 200
      And the response should have a json
        """
        { "queued_movies": ["tt1", "tt2", "tt3"] }
        """

    # Delete Movie from List  
    Scenario: Delete a queued Movie
      Given a search for a movie with the title "Home" is made
      And a search for a movie with the title "Nightmare" is made
      # push grinch into pollquery
      And a movie with the id "tt1" is pushed into poll list
      And a movie with the id "tt2" is pushed into poll list
      And a movie with the id "tt3" is pushed into poll list
      # check pollquery after adding data into it
      And a DELETE request to "http:localhost:8080/pollquery?id=tt1" is made
      When a response was returned
      Then the response should have a status 200
      And a response was returned
      # Retrieve poll query
      And a new GET request to "http:localhost:8080/pollquery" is made
      And a response was returned
      And the response should have a json
        """
        { "queued_movies": ["tt2", "tt3"] }
        """
