var BotKit = require('botkit');

var assert = require('assert');

var controller = BotKit.core({debug: false});

var bot = controller.spawn();

describe('Bot', function(){
  describe('Controller', function(done){
    
    var receive;
    
    controller.middleware.receive.use(function(bot, message, next) {
      receive = message;
      next();
    });
    
    it('should receive message', function(done){
    
      controller.hears('hello', ['message_received'], function(bot, message) {
        bot.reply(message,'hello yourself!');
        done();
      });
    
      controller.receiveMessage(bot, {text: 'hello', user: 'user', channel: 'channel', timestamp: Date.now()});
      assert.equal(receive.text, 'hello');
    });
  });
});