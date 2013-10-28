var gpio = require("gpio");
var creds = require("./configurables.js");
var exec = require("child_process").exec;
var Twitter = require('ntwitter');
var fs = require('fs');

/*var ntwitter = new Twitter({
 consumer_key: 'epAQ0hWrtkjV3Wg4fQ7ng',
 consumer_secret: 'CXjQtEzJuagciKjtUimHDRKNTBHeuO93vKzfiYmzJ0',
 access_token_key: '2160576578-AO8wl4cXTKH50m26Xgp4zzckqVWG1CF76D0Ap57',
 access_token_secret: 'pcvtnRnaDEkVt55PaBsISfp9Swp5uF4BYmK5cMpyvupRu',
 });

 var toTwitter = function(photoName) {

 console.log("file exists:");
 console.log(fs.existsSync("../" + photoName));

 //	var content = ;
 console.log(creds.tweet_content);

 fs.readFile("365418631833739264.jpg", function(err, data) {
 var base64data = new Buffer(data).toString('base64');

 ntwitter.verifyCredentials(function (err, data) {
 console.log(data);
 }).post('/statuses/update_with_media.json', {
 'status' : " testing",
 'media[]' :base64data
 },"multipart/form-data;" ,function(err, item) {
 console.log(err, item);
 });
 });
 }*/
var gpio18, gpio4, gpio23
var takePicture = function() {
	gpio4.set(1);
	exec('sudo fswebcam -r 320x240 --jpeg 95 --no-banner --save ../nodeImages/'+Math.floor(Math.random()*1000000)+'.jpg', function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error != null) {
			console.log('exec error: ' + error);
		} else {
			setTimeout(gpio4.set(0),200);
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
         setTimeout(function() { gpio18.set(1); }, 500);
	}
});

process.on ( 'exit', function(){
	gpio18.unexport();
	console.log("dying.");
})
process.on( 'SIGINT', function() {
  gpio18.set(0);
  gpio18.unexport();
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit();
})
