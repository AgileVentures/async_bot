var Botkit = require('botkit');

var controller = Botkit.core({
    debug: false,
});

var bot = controller.spawn();

var replies = [];

bot.reply = function (src, resp) {
    replies.push(resp);
}

bot.send = function (msg, cb) {
    replies.push(msg);
}

var message = {
    text: 'hello',
    user: 'user',
    channel: 'test',
    timestamp: Date.now()
};

var target;

var dreplies = function() {
    replies.forEach(function(reply, index) {
        console.log('replies[' + index + '] =>', JSON.stringify(reply));
    });
}

require('../src/controller')(bot, controller);

var expect = require('chai').expect;

describe('Mock', function () {

    it.only('should act as a bot', function () {

        // Display help
        message.text = 'help'
        controller.trigger('direct_message', [bot, message]);

        target = 'go to channel you want vote and direct mention me `start new vote "title" http://ticket.url` to start vote'
        expect(replies[0]).to.equal(target)

        // Beging a voting session
        message.text = 'start new vote "title" <http://example.com>'
        controller.trigger('direct_message', [bot, message]);

        target = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
        expect(replies[1]).to.equal(target)

        // Register a vote
        message.text = 'vote 1'
        controller.trigger('direct_message', [bot, message]);

        target = 'I received your vote: 1 <@user>'
        expect(replies[2]).to.equal(target)

        target = '<!here> ASYNC VOTE UPDATE 1 vote so far [<@user> ] on <http://example.com|title> '
        expect(replies[3].text).to.equal(target)

        // Display results
        message.text = 'result'
        controller.trigger('direct_message', [bot, message]);

        target = 'summary of voting: \n\n<@user> voted: 1\n'
        expect(replies[4]).to.equal(target)

        dreplies();
    });
});
