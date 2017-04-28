
//var TrafficQueue = require;
//var TrafficQueue = require('./TrafficQueue.js');
var PreemptionRequest = require('./PreemptionRequest.js');
var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');
var QueueManager = require('./QueueManager.js');

function callContiniously(time, fn) {
  function callFn() {
    fn();
    setTimeout(callFn, time);
  }
  setTimeout(callFn, time);
}

var request1 = new PreemptionRequest();
request1._id = 1;
request1.traffic_id = 'abcd';
//request1.notify('abcd');

var request2 = new PreemptionRequest();
request2._id = 2;
request2.traffic_id = 'abcd';

var request3 = new PreemptionRequest();
request3._id = 3;
request3.traffic_id = 'bcde';

var traffic_signals = ['abcd', 'bcde'];

var qManager = QueueManager.getInstance();
var qManagerB = QueueManager.getInstance();
//var preem = PreemptionRequestCompletionListner.getInstance();

console.log( qManager === qManagerB ); // true  

qManager.init_traffic_signal_queues(traffic_signals);
qManager.addRequest(request1);
qManager.addRequest(request2);
qManager.addRequest(request3);

//qManager.iterate();

//request1.notify('abcd');


/*setTimeout(function(){
    //request1.notify('abcd');
    PreemptionCompletionListner.getInstance().onResponse({traffic_id:'abcd'});
}, 5000);*/


callContiniously(10000, function(){
    PreemptionCompletionListner.getInstance().onResponse({traffic_id:'abcd'});
});


/*setTimeout(function(){
    PreemptionCompletionListner.getInstance().onResponse({traffic_id:'bcde'});
}, 15000);*/


var i = 3;
callContiniously(5000, function(){
    i=i+1;
    var temp = new PreemptionRequest();
    temp._id = i;
    temp.traffic_id = 'abcd';

    qManager.addRequest(temp)
});