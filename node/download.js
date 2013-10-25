var http = require('http');
var fs = require('fs');
exports.download = function(url, dest, cb) {
	var file = fs.createWriteStream(dest);
	var request = http.get(url, function(response) {
		response.pipe(file);
		file.on('finish', function() {
			file.close();
			cb();
		});
	});
}