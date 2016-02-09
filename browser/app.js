// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

var saved = [];

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('drawing', function(start, end, color, shouldBroadcast) {
	// console.log("received start",start.x,"received end",end.x)
	whiteboard.draw(start,end, color, shouldBroadcast)
})

whiteboard.on('draw', function(start, end, color, shouldBroadcast) {
	// console.log('my drawing', drawing);
	if(!color) color = 'black';

	// console.log("start",start.x,"end",end.x,"color",color);
	socket.emit('drawing', start,end, color, shouldBroadcast);
})




