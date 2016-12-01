const expect = require('chai').expect;
const botMock = require('../mocks/botMock'); 
const testedFile = require("../src/controller"); 
var winston = require('winston');
winston.level = 'info';
describe("controller tests",()=>{

  beforeEach((done)=>{
    var self = this;
    self.slackId = 'test'
    self.userName = 'test'
    self.controller = new botMock.controller(self.slackId, self.userName)
    self.input = (text)=>{ return [{
                first: true,
                user: self.slackId,
                messages:[{text: text, isAssertion:true }]
            }] }
    var logger = console.log              
    testedFile(self.controller.bot, self.controller, winston)
    done();
  });

  it('should return `help message` if user types `help`', ()=>{
    var self = this;
    var response = 'go to channel you want vote and direct mention me `start new vote "title" http://ticket.url` to start vote'
    return self.controller.usersInput(self.input('help'))
               .then((text)=>{
                 expect(text).to.equal(response)
               })
  });

  it('should return `hello yourself` if user types `hello`', ()=>{
    var self = this;
    return self.controller.usersInput(self.input('hello'))
               .then((text)=>{
                 expect(text).to.equal('Hello yourself')
               })
  }); 
 
  it('should return vote announcement if user types `start new vote`', ()=>{
    var self = this;
    var text = 'start new vote "title" <http://example.com>'
    var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
    return self.controller.usersInput(self.input(text))
               .then((text)=>{
                 expect(text).to.equal(response)
               })
  }); 
 
  it('should acknowledge vote if users direct messages `vote #`', ()=>{
    var self = this;
    var text = 'vote 1'
    var response = "I received your vote: 1 <@test>"
    return self.controller.usersInput(self.input(text))
               .then((text)=>{
                 expect(text).to.equal(response)
               })
  }); 

  it('should return results if users types `results`', ()=>{
    var self = this;
    var text = 'results'
    var response = "summary of voting: \n\n"
    return self.controller.usersInput(self.input(text))
               .then((text)=>{
                 expect(text).to.equal(response)
               })
  }); 


  xit('should summarise results after a vote', (done)=>{
    var self = this;
    var startText = 'start new vote "title" <http://example.com>'
    var voteText = 'vote 1'
    var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
    // this doesn't work - trying to work out how to test a sequence of messages
    return self.controller.usersInput([{
                first: true,
                user: self.slackId,
                messages:[{text: startText}, {text: voteText, isAssertion:true, deep: 1}]
            }])
           .then((text)=>{
             expect(text).to.equal(response)
             done()
           })
  }); 


 
});