const expect = require('chai').expect;
const botMock = require('botkit-mock');
const testedFile = require("../src/controller");

describe("controller tests",()=>{

  beforeEach((done)=>{
    var self = this;
    self.slackId = 'testID'
    self.userName = 'test'
    self.controller = new botMock.controller(self.slackId, self.userName)
    self.input = (text)=>{ return [{
                first: true,
                user: self.slackId,
                messages:[{text: text, isAssertion:true }]
            }] }
    testedFile(self.controller.bot, self.controller)
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

  it('should return vote announcement if user types `start new vote` with multiple spaces', ()=>{
    var self = this;
    var text = 'start new vote "title"          <http://example.com>'
    var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
    return self.controller.usersInput(self.input(text))
               .then((text)=>{
                 expect(text).to.equal(response)
               })
  });

  it('should return vote announcement if user types `start new vote` with multiple spaces after "start new vote"', ()=>{
    var self = this;
    var text = 'start new vote    "title"          <http://example.com>'
    var response = "<!channel> NEW ASYNC VOTE on <http://example.com|title> Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:"
    return self.controller.usersInput(self.input(text))
               .then((text)=>{
                 expect(text).to.equal(response)
               })
  });

  it('should acknowledge vote if users direct messages `vote #`', ()=>{
    var self = this;
    var text = 'vote 1'
    var response = "I received your vote: 1 <@testID>"
    var public_response = "<!here> ASYNC VOTE UPDATE 1 vote so far [<@testID> ] on <https://waffle.io/AgileVentures/WebsiteOne/cards/5834ae24efa1290e00f495a7|Add option for users to delete their account> "
    return self.controller.usersInput(self.input(text))
               .then((text)=>{
                 expect(text).to.equal(response)
                 expect(self.controller.bot.detailedAnswers['not set'][0]).to.equal(public_response)
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


  it('should summarise results after a vote', ()=>{
    var self = this;
    return self.controller.usersInput(self.input('vote 1'))
               .then((text)=>{
                 expect(text).to.equal('I received your vote: 1 <@testID>')
                 self.controller.usersInput(self.input('results'))
                     .then((text)=>{
                       expect(text).to.equal('summary of voting: \n\n<@test> voted: 1\n')
                     })
                  })
  });

});
