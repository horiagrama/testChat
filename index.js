var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

a
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
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
	socket.on('disconnect', function(){
    	console.log('user disconnected');
	});

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening at %s:%d:', app.get('ip'),app.get('port'));
});