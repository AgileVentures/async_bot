const English = require('yadda').localisation.English;
const expect = require('chai').expect;

module.exports = English.library()
    .when("I say 'help'", function () {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('help'));
    })
    .then("the bot respond back with help instructions", function () {
        const response = 'go to channel you want vote and direct mention me `start new vote "title" http://ticket.url` to start vote';
        return this.ctx.step.then(function (text) {
            expect(text).to.equal(response)
        })
    });
