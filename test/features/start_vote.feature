Feature: Starting a Vote
  As a project member
  So that I can get input on a feature/chore/bugfix that I'm interested in
  I would like to start an online vote

Scenario: Should accept multiple spaces
  Given a bot
  When I begin a voting session in the "shf" project channel with 'start new vote "title"           <http://example.com>'
  Then the bot responds back with a vote announcement in the "shf" project channel
