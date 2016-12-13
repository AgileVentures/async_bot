Feature: Voting Tests

Scenario: Should vote for features

   Given a bot
   When I begin a voting session
   Then the bot respond back with a vote announcement
   When I cast a vote
   Then the bot acknowledges that vote
   And the bot announces that a vote has been received
   When I ask for voting results
   Then the bot announces the voting results
