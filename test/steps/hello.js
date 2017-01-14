const English = require('yadda').localisation.English;
const expect = require('chai').expect;

module.exports = English.library()
    .when("I say 'hello'", function () {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('hello'));
    })
    .then("the bot respond back 'hello yourself'", function () {
        return this.ctx.step.then(function (text) {
            expect(text).to.equal('Hello yourself')
        })
    });
