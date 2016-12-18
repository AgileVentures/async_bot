const English = require('yadda').localisation.English;
const expect = require('chai').expect;

module.exports = English.library()
    .when('I begin a voting session with $TEXT', function (text) {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input(text));
    })
    .when('I begin a voting session in the "$channel" project channel with $TEXT', function(channel,text){
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input(text,channel))
    })
    .then('the bot respond back with a vote announcement', function () {
        var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
        return this.ctx.step.then(function (text) {
            expect(text).to.equal(response)
        })
    })
    .then('the bot responds back with a vote announcement in the "$channel" project channel', function(channel){
        var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
        var that = this;
        return this.ctx.step.then(function(text){
            expect(that.ctx.controller.bot.detailedAnswers[channel]).to.include(response)
        })
    })
    .when('I cast a vote', function () {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('vote 1'));
    })
    .then('the bot announces that a vote has been received in the "$channel" project channel', function (channel) {
        var that = this;
        return this.ctx.step.then(function (text) {
            var response = '<!here> ASYNC VOTE UPDATE 1 vote so far [<@testID> ] on <http://example.com|title> '
            expect(that.ctx.controller.bot.detailedAnswers[channel]).to.include(response)
        })
    })
    .then('the bot acknowledges that vote', function () {
        var that = this;
        this.ctx.step = this.ctx.step.then(function (text) {
            var response = 'I received your vote: 1 <@testID>'
            expect(that.ctx.controller.bot.detailedAnswers['testID']).to.include(response)
            return text;
        })
    })
    .when('I ask for voting results', function () {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('results'));
    })
    .when('I ask for voting results in the "$channel" project channel', function (channel) {
        this.ctx.step = this.ctx.controller.usersInput(this.ctx.input('results', channel));
    })
    .then('the bot announces the voting results', function () {
        return this.ctx.step.then(function (text) {
            var response = 'summary of voting: \n\n<@testID> voted: 1\n'
            expect(text).to.equal(response)
        })
    })
    .then('the bot announces the voting results in the "$channel" project channel', function (channel) {
        var that = this;
        return this.ctx.step.then(function (text) {
            var response = 'summary of voting: \n\n<@testID> voted: 1\n'
            expect(that.ctx.controller.bot.detailedAnswers[channel]).to.include(response)
        })
    })
