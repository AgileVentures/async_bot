Feature: Voting Tests

Scenario: Should vote for features

   Given a bot
   When I begin a voting session with 'start new vote "title" <http://example.com>'
   Then the bot respond back with a vote announcement
   When I cast a vote
   Then the bot acknowledges that vote
   And the bot announces that a vote has been received
   When I ask for voting results
   Then the bot announces the voting results

Scenario: Should accept multiple spaces

    Given a bot
    When I begin a voting session with 'start new vote "title"          <http://example.com>'
    Then the bot respond back with a vote announcement
