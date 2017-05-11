var QueueManager = require('./QueueManager.js');
var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');

console.log(PreemptionCompletionListner);
var PreemptionRequest = function(){
    this._id;
    this.traffic_id;   
    this.ambulance_id;
    //this.direction_data;
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
    //for(var i=0; i<this.locations.length; i++){
        //set signals to an ordered array later to sort with the location array
        var signals = new Array();
        for(var i = 0; i<locs.length; i++){
            signals.push(i+1);
        }

        var locs = [8, 4, 1];

        var sortedlist = new Array();
        var smallest = locs[0];
        for(var j=0; j<locs.length; j++){
            var index = 0;
            for(var k=j; k<locs.length; k++){
                if(locs[k] < smallest){
                    smallest = locs[k];
                    index = k;
                }
            }
            locs[index] = locs[0];
            locs[0] = smallest; 
            sortedlist.push(smallest);
        }
        
    //}
}

PreemptionCompletionListner.prototype.Sort(items)
{
    if (items.Length <= 1)
    {
        return;
    }
 
    var leftSize = items.Length / 2;
    var rightSize = items.Length - leftSize;
 
    var left = items.slice(0, leftSize);//new Array(leftSize);
    var right = items.slice(leftSize, rightSize);//new Array(rightSize);
    //left = left[]
    //Array.Copy(items, 0, left, 0, leftSize);
    //Array.Copy(items, leftSize, right, 0, rightSize);
 
    Sort(left);
    Sort(right);
    Merge(items, left, right);
}
 
PreemptionCompletionListner.prototype.Merge(items, left, right, signals)
{
    var leftIndex = 0;
    var rightIndex = 0;
    var targetIndex = 0;
 
    var remaining = left.Length + right.Length;
 
    while(remaining > 0)
    {
        if (leftIndex >= left.Length)
        {
            items[targetIndex] = right[rightIndex++];
        }
        else if (rightIndex >= right.Length)
        {
            items[targetIndex] = left[leftIndex++];
        }
        else if (left[leftIndex].CompareTo(right[rightIndex]) < 0)
        {
            items[targetIndex] = left[leftIndex++];
        }
        else
        {
            items[targetIndex] = right[rightIndex++];
        }
 
        targetIndex++;
        remaining--;
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