Feature: Voting Tests

Scenario: Should vote for features

   Given a bot
   When I begin a voting session
   Then the bot respond back with a vote announcement
   When I cast a vote
   Then the bot acknowledges that vote
   Then the bot announces that a vote has been received