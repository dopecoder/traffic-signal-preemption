var QueueManager = require('./QueueManager.js');
var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');

console.log(PreemptionCompletionListner);
var PreemptionRequest = function(){
    this._id;
    this.traffic_id;   
    this.ambulance_id;
    this.direction_data;
    this.authentication_data;
    this.options; 
    this.locations = new Array();
    //this.no_of_locations = 0;
}

PreemptionRequest.prototype.notify = function(traffic_id){
    console.log("traffic_id of obj : " + this.traffic_id + " taffic id of finished : " + traffic_id + " with last element as :");
    console.log(QueueManager.getInstance().seekLastElement(traffic_id));
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
        }
    }
};

PreemptionCompletionListner.prototype.update = function(Request){
    //update the variables
    var distance = this.find_distace_to_all_signals(Request);
    this.locations.push(distance);
    //this.no_of_locations=this.no_of_locations+1;
    //check if enough data is recieved
    if(this.locations.length > 15){
        //get the traffic signal id
        //update this object
        //queue the object to QueueManager
        //send a response to the phone its successful
    }
}

PreemptionCompletionListner.prototype.find_distances = function(){
    for(var distances of this.locations){
        for(var i=0; i<distances.length; i++){
            this.get_distance(distances[i].latitude, distances[i].longitude);
        }
    }
}

PreemptionCompletionListner.prototype.get_correct_traffic_signal = function(){
    for(var i=0; i<this.locations.length; i++){
        for(var j=i; j<this.locations[i].length; j++){
            smallest = this.locations[i][j];
            for(var k=0; k<this.locations[i].length; k++){
                if(this.locations[i][j] < smallest){
                    smallest = this.locations[i][j];
                }
            }
            var temp = this.locations[i][j]
            this.sortedlist[i].push(j);
        }
        
    }
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