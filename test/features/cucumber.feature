Feature: Cucumber Tests

Scenario: Should run cucumber like tests

   Given I wrote a feature in test/features
   And I wrote the step in test/steps
   When I run npm test
   Then the result is displayed on the console