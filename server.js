var Botkit = require('botkit');
var winston = require('winston');
winston.level = 'debug';
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
var bot = controller.spawn({
  token: process.env.ASYNC_VOTER_SLACK_BOT_TOKEN,
  retry: 20
}).startRTM()

// give the bot something to listen for.

require('./src/controller')(bot, controller, winston);