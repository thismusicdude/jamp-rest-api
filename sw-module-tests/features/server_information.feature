Feature: Server Information
    Scenario: Retrieve the Server Information (successful)
        Given a GET request to "http:localhost:8080" is made
        When a response was returned
        Then the response should have a status 200
        And the response should have a body
        """
        This is JAMP (Just A MoviePoller) REST API, Version 0.0
        """
  