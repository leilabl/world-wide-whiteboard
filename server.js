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

io.on('connection', function (socket) {
	socket.on('drawing', function (start, end, color, shouldBroadcast) {
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
