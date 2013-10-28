var down = require("./download");
var twitter = require('ntwitter');
var fs = require('fs');
var credentials = require('./configurables.js');
var t = new twitter({
	consumer_key : credentials.consumer_key,
	consumer_secret : credentials.consumer_secret,
	access_token_key : credentials.access_token_key,
	access_token_secret : credentials.access_token_secret
});

t.stream('statuses/filter', {
	track : ['#yolohashtagswagtest']
}, function(stream) {
	stream.on('data', function(tweet) {
		if(tweet.entities.hasOwnProperty("media")){
		if (tweet.entities.media.length > 0) {
			console.log(tweet.entities.media[0].media_url);
			download(tweet.entities.media[0].media_url, "../img/" + tweet.entities.media[0].id_str + ".jpg", function() {
				fs.rename("../img/" + tweet.entities.media[0].id_str + ".jpg", "../nodeImages/" + tweet.entities.media[0].id_str + ".jpg");
				console.log("file saved and moved");
			});
		}
		}
		else{
			console.log("something without a picture got tweeted.");
		}
	});
});

