Feature: Prompt after Inactivity
  As a project member
  So that votes get closed out and work to start
  I would like the bot to prompt in the channel if we don't have sufficient votes after a given period

# see https://github.com/AgileVentures/async_slack_bot/issues/4

  Scenario: Prompt after 12 hours and less than 3 votes
    Given a bot
#    And a vote in progress with 2 votes where the last vote was over 12 hours ago
#    Then the bot should say "@channel only 2 votes on <vote|http://vote.com> please DM me your vote"

