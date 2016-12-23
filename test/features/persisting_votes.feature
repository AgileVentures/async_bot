Feature: Persisting Votes
  As a project member
  So that my vote is not lost
  I would like my vote to be persisted before the vote ends

  Scenario: Persisting individual vote
    Given a bot
    Given network interactions are mocked
    # replace with given a vote is in progress
    When I begin a voting session in the "shf" project channel with 'start new vote "title" <http://example.com>'
    When I cast a vote
    Then the bot acknowledges that vote
    Then the vote is persisted to the Async core backend

