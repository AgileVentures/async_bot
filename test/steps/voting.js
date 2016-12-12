const expect = require('chai').expect;

var English = require('yadda').localisation.English;
const botMock = require('botkit-mock');
const testedFile = require("../../src/controller");

var assert = require('assert');

module.exports = English.library()
    .when('I begin a voting session', function () {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('start new vote "title" <http://example.com>'));
    })
    .then('the bot respond back with a vote announcement', function () {
        var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
        return this.ctx.step.then(function (text) {
            expect(text).to.equal(response)
        })
    })
