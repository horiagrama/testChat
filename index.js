var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//retain all clients sockets to broadcast to every one
var allClients = [];

app.set('port', process.env.PORT ||process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"); 

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
// 	});
// });


// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', function(socket){
	console.log('Connection to client established');
	allClients.push(socket);
	
	
	socket.on('disconnect', function(){
    	console.log('user disconnected');
    	
    	var i = allClients.indexOf(socket);
		delete allClients[i];
	});

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('/join1',function(msg){
  	socket.join(msg);
  	io.to(msg).emit('chat message','ma conectai, frate!');
  });
  
});

http.listen(app.get('port'), function(){
  console.log('listening at %s:%d:', app.get('ip'),app.get('port'));
});
