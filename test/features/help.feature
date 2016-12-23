Feature: Help Tests
  As a project member
  So that I can understand how to participate in an online vote
  I would like to be able to ask the bot for help and get instructions

Scenario: Should respond with help
   Given a bot
   When I say 'help'
   Then the bot respond back with help instructions
