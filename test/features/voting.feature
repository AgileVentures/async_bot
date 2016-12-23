Feature: Entire Vote
  As a project member
  So that I can get input on a feature/chore/bugfix that I'm interested in
  I would like to start an online vote that others can participate in and see the results

Scenario: Should vote for features
   Given a bot
   When I begin a voting session in the "shf" project channel with 'start new vote "title" <http://example.com>'
   Then the bot responds back with a vote announcement in the "shf" project channel
   When I cast a vote
   Then the bot acknowledges that vote
   And the bot announces that a vote has been received in the "shf" project channel
   When I ask for voting results in the "shf" project channel
   Then the bot announces the voting results in the "shf" project channel

