const expect = require('chai').expect;

var English = require('yadda').localisation.English;
const botMock = require('botkit-mock');
const testedFile = require("../../src/controller");

var assert = require('assert');

module.exports = English.library()
    .given("a bot", function () {

        this.ctx.input = (text) => {
            return [{
                first: true,
                user: 'testID',
                messages: [{ text: text, isAssertion: true }]
            }]
        };

        this.ctx.controller = new botMock.controller('testID', 'test')

        testedFile(this.ctx.controller.bot, this.ctx.controller)
    })
    .when("I say 'hello'", function () {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('hello'));
    })
    .then("the bot respond back 'hello yourself'", function () {
        return this.ctx.step.then(function (text) {
            expect(text).to.equal('Hello yourself')
        })
    });
