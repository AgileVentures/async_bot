Feature: Help Tests

Scenario: Should respond with help

   Given a bot
   When I say 'help'
   Then the bot respond back with help instructions
