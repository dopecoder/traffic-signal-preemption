var PreemptionRequestHandler = require('./PreemptionRequestHandler.js');
var PreemptionRequest = require('./PreemptionRequest.js');
var TrafficSignalManager = require('./TrafficSignalManager.js');
var express   = require('express');
var app       = express();


TrafficSignalManager.getInstance().init_traffic_signals();
var handler = PreemptionRequestHandler.getInstance();
console.log(handler);

var server    = app.listen(3033);
var io        = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  console.log('ON CONECTION');
  socket.emit('connected');

  socket.on('authorize', function (data) {
    console.log('ON AUTHORIZE');
    console.log(JSON.parse(data));
    var res = JSON.parse(data);
    //convert json to objrcts
    //9b44dce7ba6862d8576a40525763a973
    console.log("API_KEY : HEREEE " + res.API_KEY );
    var authKey = handler.onAuthorize(res.API_KEY);
    console.log("AUTH_KEY : " + authKey);
    setTimeout(function(){
      socket.emit('on_authorization', {key:authKey});
    }, 2000);

  });

  socket.on('register', function (data) {
    console.log('ON REGISTER');
    console.log(JSON.parse(data));
    var res = JSON.parse(data);
    //convert json to objrcts
    var req = new PreemptionRequest(res._id, res.traffic_id, res.authentication_data, res.direction_data);
    var resStatus = handler.onRegister(req);
    setTimeout(function(){
      socket.emit('on_registration', {status:resStatus});
    }, 2000);

  });

  socket.on('location_changed', function (data) {
    console.log('ON LOCATION CHANGED');
    console.log(JSON.parse(data));
    var res = JSON.parse(data);
    var req = new PreemptionRequest(res._id, res.traffic_id, res.authentication_data, res.direction_data);
    //convert json to objrcts
    handler.onLocationChanged(req, socket);
  });

});
