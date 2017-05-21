var QueueManager = require('./QueueManager.js');
var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');
var TrafficSignalManager = require('./TrafficSignalManager.js');



//console.log("Ahh! " + TrafficSignalManager);

var PreemptionRequest = function(_id, traffic_id, authentication_data, direction_data){
    this._id = _id;
    this.traffic_id = traffic_id;
    this.direction_data = direction_data;
    this.authentication_data = authentication_data;
    this.locations = new Array();
    //this.no_of_locations = 0;
}

PreemptionRequest.prototype.notify = function(request){
    console.log("traffic_id of obj : " + this.traffic_id + " taffic id of finished : " + request.id + " with last element as :");
    //console.log(QueueManager.getInstance().seekLastElement(traffic_id));
    if(this.traffic_id == request.id && QueueManager.getInstance().seekLastElement(request.id)){
        //console.log("executing 1");
        //console.log("comparing " + this._id + " and " + QueueManager.getInstance().seekLastElement(traffic_id).data._id);
        if(QueueManager.getInstance().seekLastElement(request.id).data._id == this._id){

            //console.log("executing 2");
            //remove observer
            PreemptionCompletionListner.getInstance().removeObserver(this);
            //pop it from the queue
            QueueManager.getInstance().popRequest(request.id)
            //execute itself.
            this.execute_request();
	          console.log("executing request with id : " + request.id + " on side : " + request.side+1);
            //TrafficSignalManager.getInstance.notify_signal();
        }
    }
};

PreemptionRequest.prototype.update = function(location, request, socket){

    var that = this;
    var req_obj = request;
    console.log('called update');
    this.locations.push(location);
    if(this.locations.length == 10){
	  location.get_correct_signal(TrafficSignalManager, this.locations).then(function(v){
      	  console.log("get_nearest is resolved "+ v);
          req_obj.traffic_id = v._id;
		      var qManager = QueueManager.getInstance();
          qManager.addRequest(req_obj);
          //send a response to the phone its successful
          console.log("REQUEST IS BEING ADDED TO QUEUE!");
          //send the client that the request has been authorized
          socket.emit("AUTHORIZED", v);

    }).catch(function(v){
        console.log('ERROR : ' + v);
    });
    }
    //update the variables


}

PreemptionRequest.prototype.execute_request = function(){
    //execute or contact the traffic signal
    console.log("Turning Traffic signal with traffic_id : " + this.traffic_id + " and id : " + this._id);
};

PreemptionRequest.prototype.register_to_observer = function(){
    console.log(this);
    PreemptionCompletionListner.getInstance().addObserver(this);
    console.log("Registering to observer");
};

module.exports = PreemptionRequest;
