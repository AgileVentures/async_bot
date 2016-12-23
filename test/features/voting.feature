Feature: Voting Tests

Scenario: Should vote for features

   Given a bot
   When I begin a voting session in the "shf" project channel with 'start new vote "title" <http://example.com>'
   Then the bot responds back with a vote announcement in the "shf" project channel
   When I cast a vote
   Then the bot acknowledges that vote
   And the bot announces that a vote has been received in the "shf" project channel
   When I ask for voting results in the "shf" project channel
   Then the bot announces the voting results in the "shf" project channel

Scenario: Should accept multiple spaces

  Given a bot
  When I begin a voting session in the "shf" project channel with 'start new vote "title"           <http://example.com>'
  Then the bot responds back with a vote announcement in the "shf" project channel
