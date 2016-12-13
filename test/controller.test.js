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

});
