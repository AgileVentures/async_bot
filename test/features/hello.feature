Feature: Hello Tests
  As an interested party
  So that I can check the bot is online
  I would like to be able to ping the bot with 'hello' and receive a response

Scenario: Should respond with hello
  Given a bot
  When I say 'hello'
  Then the bot respond back 'hello yourself'
