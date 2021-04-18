var messenger = require('messenger');

var client = messenger.createSpeaker(8000);
var server = messenger.createListener(8000);

server.on('give it to me', function(message, data){
  message.reply({'you':'got it'});
});
