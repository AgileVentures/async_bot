module.exports = function(votes){
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
