var PreemptionRequestHandler = require('./PreemptionRequestHandler.js');
var TrafficSignalManager = require('./TrafficSignalManager.js');
var express   = require('express');
var app       = express();


TrafficSignalManager.getInstance().init_traffic_signals();
var handler = PreemptionRequestHandler.getInstance();

var server    = app.listen(3033);
var io        = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('authorize', function (data) {
    console.log(data);
    //convert json to objrcts
    var key = handler.onAuthorize();
    socket.emit('on_authorization', {key:key});
  });

  socket.on('register', function (data) {
    console.log(data);
    //convert json to objrcts
    var status = handler.onRegister();
    socket.emit('on_registration', {status:status});
  });

  socket.on('location_changed', function (data) {
    console.log(data);
    //convert json to objrcts
    handler.onLocationChanged();
  });
});
     
