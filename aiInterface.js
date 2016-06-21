var http = require("http");

function getRandomMove(size, board, lastMove, cb){
	var move = {
		"size": size,
		"board": board,
		"last":lastMove
	}
	
	var options = {
		host: 'roberts.seng.uvic.ca',
		path: '/ai/random',
		port: '30000',
		method: 'POST',
		headers: {'Content-Type': 'application/json'}
	}
	var str = '';
	var callback = function(response){
		response.on('data', function(chunk){
			str += chunk.toString();
		});
		response.on('end', function(){
			console.log('recieved '+str)
			cb(JSON.parse(str));
		});
	}
	
	
	
	var req = http.request(options, callback);
	req.on('error', function(e){
		console.log('problem with request' + e.message);
	});
	
	req.write(JSON.stringify(move));
	console.log("Sending "+JSON.stringify(move));
	req.end();
}

module.exports = {
    getRandomMove : getRandomMove
}