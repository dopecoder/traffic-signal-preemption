var QueueManager = require('./QueueManager.js');
var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');
var TrafficSignalManager = require('./TrafficSignalManager.js');



console.log("Ahh! " + TrafficSignalManager);

var PreemptionRequest = function(_id, traffic_id, authentication_data, direction_data){
    this._id = _id;
    this.traffic_id = traffic_id;
    this.direction_data = direction_data;
    this.authentication_data = authentication_data;
    this.locations = new Array();
    //this.no_of_locations = 0;
}

PreemptionRequest.prototype.notify = function(traffic_id){
    console.log("traffic_id of obj : " + this.traffic_id + " taffic id of finished : " + traffic_id + " with last element as :");
    //console.log(QueueManager.getInstance().seekLastElement(traffic_id));
    if(this.traffic_id == traffic_id && QueueManager.getInstance().seekLastElement(traffic_id)){
        //console.log("executing 1");
        //console.log("comparing " + this._id + " and " + QueueManager.getInstance().seekLastElement(traffic_id).data._id);
        if(QueueManager.getInstance().seekLastElement(traffic_id).data._id == this._id){

            //console.log("executing 2");
            //remove observer
            PreemptionCompletionListner.getInstance().removeObserver(this);
            //pop it from the queue
            QueueManager.getInstance().popRequest(traffic_id)
            //execute itself.
            this.execute_request();
	          console.log("executing request with id : " + traffic_id);
        }
    }
};

PreemptionRequest.prototype.update = function(location, request, socket){

    var that = this;
    var req_obj = request;
    console.log('called update');
    //update the variables
    location.get_nearest(TrafficSignalManager).then(function(v){
      console.log("get_nearest is resolved "+ v);
      console.log(v);
      that.locations.push(v[0]);
      console.log("LENGTH : " + that.locations.length);
      if(that.locations.length == 5){
        TrafficSignalManager.getInstance().get_signal(v[0]).then(function(result){
          console.log("get_signal resolved " + result);

          console.log("REQ OBJ : " + req_obj);
          request.traffic_id = result._id;
          //queue the object to QueueManager
          var qManager = QueueManager.getInstance();
          qManager.addRequest(req_obj);
          //send a response to the phone its successful
          console.log("REQUEST IS BEING ADDED TO QUEUE!");
          socket.emit("AUTHORIZED");


        }).catch(function(result){
          console.log("ERR : " + result);
        });

      }

      //this.locations.push(signal);
      //this.no_of_locations=this.no_of_locations+1;
      //check if enough data is recieved
      /*console.log("LOCATIONS LENGTH : " + this.locations.length);
      if(this.locations.length > 3){
          //get the traffic signal id
          TrafficSignalManager.getInstance().get_signal(this.locations[0]).then(function(v){
            console.log("Turning green on LINE 48 of PR.js");
          }).catch(function(v){
            console.log('ERROR : ' + v);
          });
          //console.log(signal);
          //update this object
          //request.traffic_id = signal;
          //queue the object to QueueManager
          //var qManagerB = QueueManager.getInstance();
          //qManagerB.addRequest(request);
          //send a response to the phone its successful
          console.log("REQUEST IS BEING ADDED TO QUEUE!");
      }*/
    }).catch(function(v){
        console.log('ERROR : ' + v);
    });

}

PreemptionRequest.prototype.cb = function(data){
  console.log('runnning');
  console.log(data);
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
