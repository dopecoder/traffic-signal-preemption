var TrafficQueue = require('./TrafficQueue.js');
//var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');
//console.log("Here i am :");
//console.log(PreemptionCompletionListner);

var QueueManager = (function () {
    "use strict";
    var instance; //prevent modification of "instance" variable

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;

        //Singleton initialization code
        this.queues = new Array();
        this.traffic_signals = new Array();
    }

    //instance accessor
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }

    Singleton.prototype.init_traffic_signal_queues = function(traffic_signals){
        console.log("Init : ");
        console.log(traffic_signals);
        this.traffic_signals = traffic_signals;
        for(var traffic_signal of this.traffic_signals){
            console.log(traffic_signal._id);
            this.queues[traffic_signal._id] = new TrafficQueue();
            //this.queues[traffic_signal].print_queue();
        }
    }

    Singleton.prototype.addRequest = function(Request){
        /*if(!this.queues[Request.traffic_id]){
            this.queues[Request.traffic_id] = new TrafficQueue();
        }*/
        console.log(Request.traffic_id);
        this.queues[Request.traffic_id] = new TrafficQueue();
        this.queues[Request.traffic_id].enqueue(Request);
        Request.register_to_observer();
    }

    Singleton.prototype.popRequest = function(traffic_id){
        return this.queues[traffic_id].dequeue();
    }

    Singleton.prototype.seekLastElement = function(traffic_id){
        //if(this.queues[traffic_id]){
        return this.queues[traffic_id].seekLastElement();// || null;
        //return null;
    }

    Singleton.prototype.print = function(Request){
        this.queues[Request.traffic_id].print_queue();
    }

    Singleton.prototype.check_and_notify = function(){
        for(var traffic_signal in this.traffic_signals){
            if(this.queues[traffic_signal].is_empty()){
                PreemptionCompletionListner.onResponse({traffic_id : traffic_signal});
            }
        }
    }

    Singleton.prototype.iterate = function(){
        console.log("Iterating");
        for(var traffic_signal of this.traffic_signals){
            console.log(this.queues[traffic_signal]);
        }
    }

    return Singleton;
}());

module.exports = QueueManager;
