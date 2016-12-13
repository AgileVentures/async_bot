const English = require('yadda').localisation.English;
const botMock = require('botkit-mock');
const testedFile = require("../../src/controller");

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
    });
