var path = require('path');

var http = require('http');
var server = http.createServer();
//because we are using sockets we need to create a server with http
var socketio = require('socket.io');

var express = require('express');
var app = express();

//this line needs to be above creating the io server
server.on('request', app);

var io = socketio(server);

var saved = [];

io.on('connection', function (socket) {
	if(saved.length > 0) {
		for(var i = 0; i < saved.length; i++) {
			socket.emit('drawing',saved[i].start, saved[i].end, saved[i].color, saved[i].shouldBroadcast )
			}
		}
	socket.on('drawing', function (start, end, color, shouldBroadcast) {
		saved.push({
			start: start,
			end: end,
			color: color,
			shouldBroadcast: true
		})
		socket.broadcast.emit('drawing', start, end, color, shouldBroadcast);
	});
	socket.on('disconnect', function () {
	    console.log('Goodbye :(');
	});
});



server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
