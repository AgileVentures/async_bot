var assert = require('assert');
var vote_text = require('../src/utils');

describe('Server', function(){
  describe('vote_text', function(){
    it('should format vote text correctly for no votes', function(){
      assert.equal(vote_text([]), '0 vote so far []')
    });
  });
});