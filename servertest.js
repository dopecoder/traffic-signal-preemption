var TrafficSignalManager = require('./TrafficSignalManager.js');
var Location = require('./Location.js');
var PreemptionRequestHandler = require('./PreemptionRequestHandler.js');
var PreemptionRequest = require('./PreemptionRequest.js');
var express   = require('express');
var app       = express();


//TrafficSignalManager.getInstance().Init_For_Once();
//console.log("Initialization done, remove it.");
var signal = TrafficSignalManager.getInstance();
console.log(signal);
signal.init_traffic_signals(signal);
var handler = PreemptionRequestHandler.getInstance();

function authorize(data){
    console.log(data);
    //convert json to objrcts
    var key = handler.onAuthorize(data);
    return key;
}

function register(data) {
    console.log(data);
    //convert json to objrcts
    var status = handler.onRegister(data);
    return status;
}

function location_changed(data) {
    console.log(data);
    //convert json to objrcts
    handler.onLocationChanged(data);
}

var auth_key = authorize('9b44dce7ba6862d8576a40525763a973');
//Need to send the complete request object
var Request1 = new PreemptionRequest('9b44dce7ba6862d8576a40525763a973','01',auth_key,{latitude : 12.928031, longitude : 77.587640});
var Request2 = new PreemptionRequest('9b44dce7ba6862d8576a40525763a973','01',auth_key,{latitude : 12.928031, longitude : 77.587640});
var Request3 = new PreemptionRequest('9b44dce7ba6862d8576a40525763a973','01',auth_key,{latitude : 12.928031, longitude : 77.587640});
var Request4 = new PreemptionRequest('9b44dce7ba6862d8576a40525763a973','01',auth_key,{latitude : 12.928031, longitude : 77.587640});
var Request5 = new PreemptionRequest('9b44dce7ba6862d8576a40525763a973','01',auth_key,{latitude : 12.928031, longitude : 77.587640});
var Request6 = new PreemptionRequest('9b44dce7ba6862d8576a40525763a973','01',auth_key,{latitude : 12.928031, longitude : 77.587640});

console.log('REQUEST 1 : ' + Request1);
var status = register(Request1);

setTimeout(function(){location_changed(Request2);}, 4000);

setTimeout(function(){location_changed(Request3);}, 6000);

setTimeout(function(){location_changed(Request4);}, 8000);

setTimeout(function(){location_changed(Request5);}, 10000);

setTimeout(function(){location_changed(Request6);}, 12000);
