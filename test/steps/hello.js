const expect = require('chai').expect;

var English = require('yadda').localisation.English;
const botMock = require('botkit-mock');
const testedFile = require("../../src/controller");

var assert = require('assert');

var self = this;
self.input = (text) => {
  return [{
    first: true,
    user: self.slackId,
    messages: [{ text: text, isAssertion: true }]
  }]
};

var step;

module.exports = English.library()
  .given("a bot", () => {
    self.slackId = 'testID'
    self.userName = 'test'
    self.controller = new botMock.controller(self.slackId, self.userName)

    testedFile(self.controller.bot, self.controller)

  })
  .when("I say 'hello'", () => {
    var self = this;
    step = self.controller.usersInput(self.input('hello'));
  })
  .then("the bot respond back 'hello yourself'", () => {
    return step.then((text) => {
      expect(text).to.equal('Hello yourself')
    })

  });
