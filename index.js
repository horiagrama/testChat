// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// 
// app.set('port', process.env.PORT ||process.env.OPENSHIFT_NODEJS_PORT || 3000);
// // app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"); 
// 
// app.get('/', function(req, res){
//   res.sendfile(__dirname + '/index.html');
// });
// 
// // io.on('connection', function(socket){
// //   console.log('a user connected');
// //   socket.on('disconnect', function(){
// //     console.log('user disconnected');
// // 	});
// // });
// 
// 
// // io.on('connection', function(socket){
// //   socket.on('chat message', function(msg){
// //     console.log('message: ' + msg);
// //   });
// // });
// 
// io.on('connection', function(socket){
// 	console.log('Connection to client established');
// 	
// 	socket.on('disconnect', function(){
//     	console.log('user disconnected');
// 	});
// 
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });
// 
// http.listen(app.get('port'), function(){
//   console.log('listening at %s:%d:', app.get('ip'),app.get('port'));
// });


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);

var port = app.get('port');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	console.log('Connection to client established');
	socket.on('disconnect', function(){
    	console.log('user disconnected');
	});
	
	io.emit('/conn', 'User connected');
	
  socket.on('/msg', function(msg){
    io.emit('/msg', msg);
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:' + port);
});