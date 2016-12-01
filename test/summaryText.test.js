var assert = require('assert');
var expect = require('chai').expect;

var summaryText = require('../src/summaryText');

describe('summary_text', function(){
  it('should format vote text correctly for no votes', function(){
    expect(summaryText([])).to.equal('0 vote so far []')
  });
});
