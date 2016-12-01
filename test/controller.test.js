const expect = require('chai').expect;
const botMock = require('../mocks/botMock'); 
const testedFile = require("../src/controller"); 

describe("controller tests",()=>{

  beforeEach((done)=>{
    var self = this;
    self.slackId = 'test'
    self.userName = 'test'
    self.controller = new botMock.controller(self.slackId, self.userName)
    testedFile(self.controller.bot, self.controller)
    done();
  });

  it('should return `help message` if user types `help`', ()=>{
    var self = this;
    return self.controller.usersInput([{
                first: true,
                user: self.slackId,
                messages:[{text: 'help', isAssertion:true }]
            }]).then((text)=>{
                expect(text).to.equal('help message')
            })
  });

  it('should return `hello yourself` if user types `hello`', ()=>{
    var self = this;
    return self.controller.usersInput([{
                first: true,
                user: self.slackId,
                messages:[{text: 'hello', isAssertion:true }]
            }]).then((text)=>{
                expect(text).to.equal('Hello yourself')
            })
  }); 
 
});