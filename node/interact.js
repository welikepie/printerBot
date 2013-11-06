var toTwitter = true; //push all the photos taken to twitter!
var tweet = "Hello from the EventHandler Photo Booth!"; //text to tweet with image.

var gpio = require("gpio");
var creds = require("./configurables.js");
var exec = require("child_process").exec;
var fs = require('fs');
var https = require('https');
var OAuth = require('oauth').OAuth;
var gpio18, gpio4, gpio23;

var takePicture = function() {
	gpio4.set(1);
	var fileNombre = Math.floor(Math.random() * 1000000);
	exec('sudo fswebcam -r 320x240 --jpeg 95 --no-banner --save ../nodeImages/' + fileNombre + '.jpg', function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		//tweet , fileName
		if(toTwitter == true){
		shootToTwitter(tweet,fileNombre);
		}
		if (error != null) {
			console.log('exec error: ' + error);
		} else {
			setTimeout(gpio4.set(0), 200);
		}
	});
}
gpio4 = gpio.export(4, {
	direction : 'out',
	interval : 200,
	ready : function() {
		console.log("gpio4");
		gpio23 = gpio.export(23, {
			direction : 'in',
			interval : 50,
			ready : function() {
				console.log("gpio23");
				gpio23.on("change", function(val) {
					// value will report either 1 or 0 (number) when the value changes
					if (val == 0) {
						takePicture();
					}
				});
				//
			}
		});
	}
});

gpio18 = gpio.export(18, {
	direction : 'out',
	interval : 200,
	ready : function() {
		setTimeout(function() {
			gpio18.set(1);
		}, 500);
	}
});

process.on('exit', function() {
	gpio18.unexport();
	console.log("dying.");
})
process.on('SIGINT', function() {
	gpio18.set(0);
	gpio18.unexport();
	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
	// some other closing procedures go here
	process.exit();
})

function shootToTwitter(fileName, tweet) {
	var data = fs.readFile(fileName,function(err,data){
		if(err){
			console.log(err);
		}
		else{
			var oauth = new OAuth('https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token', creds.consumer_key, creds.consumer_secret, '1.0A', null, 'HMAC-SHA1');
	var crlf = "\r\n";
	var boundary = '---------------------------10102754414578508781458777923';
	var separator = '--' + boundary;
	var footer = crlf + separator + '--' + crlf;
	var fileHeader = 'Content-Disposition: file; name="media"; filename="' + fileName + '"';

	var contents = separator + crlf + 'Content-Disposition: form-data; name="status"' + crlf + crlf + tweet + crlf + separator + crlf + fileHeader + crlf + 'Content-Type: image/jpeg' + crlf + crlf;

	var multipartBody = Buffer.concat([new Buffer(contents), data, new Buffer(footer)]);

	var hostname = 'api.twitter.com';
	var authorization = oauth.authHeader('https://api.twitter.com/1.1/statuses/update_with_media.json', creds.access_token, creds.access_token_secret, 'POST');

	var headers = {
		'Authorization' : authorization,
		'Content-Type' : 'multipart/form-data; boundary=' + boundary,
		'Host' : hostname,
		'Content-Length' : multipartBody.length,
		'Connection' : 'Keep-Alive'
	};

	var options = {
		host : hostname,
		port : 443,
		path : '/1.1/statuses/update_with_media.json',
		method : 'POST',
		headers : headers
	};

	var request = https.request(options);
	request.write(multipartBody);
	request.end();

	request.on('error', function(err) {
		console.log('Error: Something is wrong.\n' + JSON.stringify(err) + '\n');
	});

	request.on('response', function(response) {
		response.setEncoding('utf8');
		response.on('data', function(chunk) {
	//		console.log(chunk.toString());
		});
		response.on('end', function() {
			console.log(response.statusCode + '\n');
		});
	});
	
		}
	});
}
