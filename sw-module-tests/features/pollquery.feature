@feature:pollquery
Feature: Pollquery

  Scenario: Selects a movie for a poll
    Given a search for a movie with the title "grinch" is made
    # check first pollquery
    And the queued movies are empty
    # push into pollquery
    And a new POST request to "http:localhost:8080/pollquery?id=tt1" is made
    And a response was returned
    And the response should have a status 200
    And the response should have a json
      """
        {
            "msg": "movie Grinch added to poll list"
        }
      """
    # check pollquery after adding data into it
    And a new GET request to "http:localhost:8080/pollquery" is made
    When a response was returned
    Then the response should have a status 200
    And the response should have a json
      """
      {
        "queued_movies": ["tt1"]
      }
      """
