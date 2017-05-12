var TrafficSignalModel = require('./TrafficSignalSchema.js');


var TrafficSignalManager = (function(){
    "use strict";
    var instance;

    var Singleton = function(){
        if (instance) {
            return instance;
        }
        instance = this;

        this.traffic_signals;
        this.no_of_traffic_signals;
        this.requests;
        this.no_of_requests;
        
        this.mongoose   = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/signals'); // connect to our database
    }

    Singleton.getInstance = function(){
        return instance || new Singleton();
    }

    Singleton.init_traffic_signals = function(){
        //retrieve from mongodb
        TrafficSignalModel.find(function(err, signals) {
			if (err)
				res.send(err);
			
			console.log(JSON.parse(signals));
            if(this.traffic_signals == null){
			    this.traffic_signals = new  Array();
            }
			this.traffic_signals = JSON.parse(signals);
		});
    }

    Singleton.save_signals = function(){
        //save to mongodb
    }

    Singleton.add_signal = function(TrafficSignal){
        this.traffic_signals.push(TrafficSignal);
        Singleton.save_signals();
    }

    /*Singleton.remove_signal = function(TrafficSignal){

    }*/

    Singleton.notify_signal = function(TrafficSignal, duration){
        //implement setTimeout with the socket.on("GREEN LIGHT", SERET CODE, SIGNAL ID);
    }
    
}());