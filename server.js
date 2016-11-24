var Botkit = require('botkit');
var getUrls = require('get-urls');

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.ASYNC_VOTER_SLACK_BOT_TOKEN,
}).startRTM()

// give the bot something to listen for.
controller.hears('hello',['direct_message','direct_mention'],function(bot,message) {

  bot.reply(message,'Hello yourself.');

});

var votes = [];
var start_channel;
var story = {
              name: "Add option for users to delete their account",
              url: 'https://waffle.io/AgileVentures/WebsiteOne/cards/5834ae24efa1290e00f495a7'
            };
var instructions = 'Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:'


var vote_text = function(){
  var text = votes.length +' vote';
  if(votes.length > 1){
    text += 's';
  }
  text += ' so far ['
  votes.forEach(function(vote) {
     text += '<@' + vote.user + '> ';
  });
  text += ']'
  return text;
};

controller.hears('start new vote',['direct_message','direct_mention'],function(bot,message) {
  votes = [];
  start_channel = message.channel;
  console.log(message.text)
  story.name = message.text.match(/start new vote "(.*)" <?http/)[1]
  story.url = getUrls(message.text)[0];
  bot.reply(message,'<!channel> NEW ASYNC VOTE on <' + story.url + '|' + story.name + '> ' + instructions);
});

controller.hears('vote',['direct_message'],function(bot,message) {
  console.log(message)
  vote = message.text.match(/\d+/)[0]
  votes.push({vote:vote, user:message.user});
  bot.reply(message,'I received your vote: ' + vote +  ' <@'+message.user+'>');
  bot.say({channel: start_channel, text: '<!here> ASYNC VOTE UPDATE '+ vote_text()+ ' on <' + story.url + '|' + story.name + '> '});
});

controller.hears('result',['direct_message','direct_mention'],function(bot,message) {
  response = 'summary of voting: \n\n'
  votes.forEach(function(vote) {
     response += '<@' + vote.user + '> voted: '+ vote.vote + '\n';
  });
  bot.reply(message,response);
});

controller.on('team_joined',function(bot, message) {

    bot.reply(message, 'Welcome aboard!');

});


