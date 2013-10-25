var down = require("./download");
var fs = require('fs');
Instagram = require('instagram-node-lib');
Instagram.set('client_id', '8daa2e2650f94045bbce558515358112');
Instagram.set('client_secret', '49e157817bc74afa8efde3d25519abbd');

var arr = [];
setInterval(function() {

	Instagram.tags.recent({
		name : 'welikepieprinter',
		complete : function(data, pagination) {
			// data is a javascript object/array/null matching that shipped Instagram
			// when available (mostly /recent), pagination is a javascript object with the pagination information
			//console.log(pagination);
			for (var i in data) {
				if (arr.indexOf(data[i].id) == -1) {
					arr.push(data[i].id);
					Instagram.media.info({
						media_id : data[i].id,
						complete : function(imgData, pagination) {
							console.log(data);
							down.download(imgData.images.low_resolution.url, "../img/" + data[i].id + ".jpg", function() {
								fs.rename("../img/" + data[i].id + ".jpg", "../nodeImages/" + data[i].id + ".jpg");
								console.log("file saved and moved");
							});
						}
					});
				}
			}
			//console.log(arr.length);
		}
	})

}, 500); 