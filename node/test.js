var Twitter = require('ntwitter');
var fs = require('fs');
var creds = require('./configurables');

var fileName = "ubertest.jpg";
var tweet = "testing stuff";
var data = fs.readFileSync(fileName);
var https = require('https');
var OAuth= require('oauth').OAuth;

  function getEchoAuth(url) { 
  //helper to construct echo/oauth headers from URL
    var oauth = new OAuth('https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      creds.access_token,
      //test app token
	creds.access_token_secret, 
      //test app secret
    '1.0A',
    null,
      'HMAC-SHA1');
    var orderedParams = oauth._prepareParameters(
      "1111111111-AAAAAA", //test user token
    "AAAAAAAAAAAAAAAAAAAAAAA", //test user secret
    "GET",
    url
    );
    return oauth._buildAuthorizationHeaders(orderedParams);
  }


var oauth = new OAuth(
	 'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
	 creds.consumer_key,
    creds.consumer_secret,
    '1.0A', null, 'HMAC-SHA1');
      
var crlf = "\r\n";
var boundary = '---------------------------10102754414578508781458777923';

var separator = '--' + boundary;
var footer = crlf + separator + '--' + crlf;
var fileHeader = 'Content-Disposition: file; name="media"; filename="' + fileName + '"';

var contents = separator + crlf
    + 'Content-Disposition: form-data; name="status"' + crlf
    + crlf
    + tweet + crlf
    + separator + crlf
    + fileHeader + crlf
    + 'Content-Type: image/jpeg' +  crlf
    + crlf;

var multipartBody = Buffer.concat([
    new Buffer(contents),
    data,
    new Buffer(footer)]);

var hostname = 'api.twitter.com';
var authorization = oauth.authHeader(
    'https://api.twitter.com/1.1/statuses/update_with_media.json',
        creds.access_token,creds.access_token_secret, 'POST');

var headers = {
    'Authorization': authorization,
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Host': hostname,
    'Content-Length': multipartBody.length,
    'Connection': 'Keep-Alive'
};

var options = {
    host: hostname,
    port: 443,
    path: '/1.1/statuses/update_with_media.json',
    method: 'POST',
    headers: headers
};

var request = https.request(options);     
request.write(multipartBody);
request.end();

request.on('error', function (err) {
    console.log('Error: Something is wrong.\n'+JSON.stringify(err)+'\n');
});

request.on('response', function (response) {            
    response.setEncoding('utf8');            
    response.on('data', function (chunk) {
        console.log(chunk.toString());
    });
    response.on('end', function () {
        console.log(response.statusCode +'\n');
    });
});    
/*var ntwitter = new Twitter({
	consumer_key : 'epAQ0hWrtkjV3Wg4fQ7ng',
	consumer_secret : 'CXjQtEzJuagciKjtUimHDRKNTBHeuO93vKzfiYmzJ0',
	access_token_key : '2160576578-AO8wl4cXTKH50m26Xgp4zzckqVWG1CF76D0Ap57',
	access_token_secret : 'pcvtnRnaDEkVt55PaBsISfp9Swp5uF4BYmK5cMpyvupRu',
});

console.log("BIGSTONKINGLINEBREAK==========================================================");
	console.log("file exists:");
	console.log(fs.existsSync("ubertest.jpg"));

	//	var content = ;
	console.log(creds.tweet_content);

	fs.readFile("ubertest.jpg", function(err, data) {
		var base64data = new Buffer(data).toString('base64');

		ntwitter.verifyCredentials(function(err, data) {
			//console.log(data);
		});
		ntwitter.post('/statuses/update.json',{
			 status: "ololol",
    		include_entities: 1
		}, "multipart/form-data", function(err, item) {
			//console.log(err, item);
		});
		console.log("UPDATING STATUS BEOTCH");
		ntwitter.post('/statuses/update_with_media.json', {
			'status' : "testing",
			'media[]' : "http://i.imgur.com/PrU2db2.jpg"
		}, "multipart/form-data", function(err, item) {
			console.log(err, item);
		});
		console.log("UPDATING STATUS WITH MEDIA BEOTCH");

	});
*/