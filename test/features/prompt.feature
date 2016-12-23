Feature: Help Tests
  As a project member
  So that I can understand how to participate in an online vote
  I would like the bot to provide a helpful message when I get the syntax wrong 

  Scenario: Help Tests
    Given a bot
# see https://github.com/AgileVentures/async_slack_bot/issues/13

# Scenario: Should respond with help for incorrect vote starting
#    Given a bot
#    When  begin a voting session in the "shf" project channel with 'start new vote "title"'
#    Then the bot respond back with help instructions, e.g. the format for starting a vote

# Scenario: Should respond with help for incorrect vote
#    Given a bot
#    And a vote in progress
#    When I say "vote trump"
#    Then the bot respond back with help instructions, e.g. the format of voting
