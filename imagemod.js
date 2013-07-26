var http = require('http');
var fs = require('fs');
var im = require('node-imagemagick');
sort("http://i.imgur.com/4VkKZGr.jpg");

function sort(fileUrl){
if(!fs.existsSync("nodeImages/")){
	fs.mkdirSync("nodeImages");
}
var name = fs.readdirSync("nodeImages/").length+".png";
download(fileUrl,"nodeImages/"+name,function(){
	console.log("done");
	console.log(fs.existsSync("nodeImages/"+name));
	console.log("nodeImages/"+name);
	im.identify("nodeImages/"+name,function(err,value){
		console.log(err);
		console.log(value);
	})
	
});
}


function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      cb();
    });
  });
}