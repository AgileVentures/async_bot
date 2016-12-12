Feature: Voting Tests

Scenario: Should vote for features

   Given a bot
   When I begin a voting session
   Then the bot respond back with a vote announcement
