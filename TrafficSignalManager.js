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

    Singleton.prototype.Init_For_Once = function(){
        var signal1 = new TrafficSignalModel({
            no_of_points : 3,
            points : [[12.928964, 77.586075], [12.928614, 77.586483], [12.928339, 77.586146]]
        })
        signal1.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("signal1 saved!");
            }
        });

        var signal2 = new TrafficSignalModel({
            no_of_points : 3,
            points : [[12.928639, 77.584127], [12.928315, 77.583676], [12.928671, 77.583451]]
        })
        signal2.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("signal2 saved!");
            }
        });
        
        
    }

    Singleton.prototype.init_traffic_signals = function(){
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

    Singleton.prototype.save_signals = function(){
        //save to mongodb
    }

    Singleton.prototype.add_signal = function(TrafficSignal){
        this.traffic_signals.push(TrafficSignal);
        Singleton.save_signals();
    }

    /*Singleton.remove_signal = function(TrafficSignal){

    }*/

    Singleton.prototype.notify_signal = function(TrafficSignal, duration){
        //implement setTimeout with the socket.on("GREEN LIGHT", SERET CODE, SIGNAL ID);
    }

    return Singleton;
    
}());

module.exports = TrafficSignalManager;