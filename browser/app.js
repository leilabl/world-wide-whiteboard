// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('drawing', function(start, end, color, shouldBroadcast) {
	whiteboard.draw(start,end, color, shouldBroadcast)
})

whiteboard.on('draw', function(start, end, color, shouldBroadcast) {
	socket.emit('drawing', start,end, color, shouldBroadcast);
})




