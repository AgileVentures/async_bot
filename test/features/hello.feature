Feature: Hello Tests

Scenario: Should respond with hello

   Given a bot
   When I say 'hello'
   Then the bot respond back 'hello yourself'
