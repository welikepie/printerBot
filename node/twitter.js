var twitter = require('ntwitter');
var credentials = require('./configurables.js');
var http = require('http');
var fs = require('fs');
var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['#yolohashtagswagtest'] },
    function(stream) {
        stream.on('data', function(tweet) {
        	if(tweet.entities.media.length > 0){
	            console.log(tweet.entities.media[0].media_url);
	            download(tweet.entities.media[0].media_url,"../nodeImages/"+tweet.entities.media[0].id_str+".jpg",function(){console.log("file saved")});
           }
        });
    }
);

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      cb();
    });
  });
}