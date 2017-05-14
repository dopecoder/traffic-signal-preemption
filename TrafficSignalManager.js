var mongoose = require('mongoose');
var TrafficSignalModel = require('./TrafficSignalSchema.js');



var TrafficSignalManager = (function(){
    "use strict";
    var instance;

    function Singleton(){
        if (instance) {
            return instance;
        }
        instance = this;

        this.traffic_signals = new Array();
        this.traffic_signals.push(0);
        this.no_of_traffic_signals = 0;
        this.requests;
        this.no_of_requests = 0;
        this.signal = 0;

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

    Singleton.prototype.init_traffic_signals = function(cb){
        //retrieve from mongodb
      //console.log("THIS : " + this.traffic_signals);
      cb = this;
      TrafficSignalModel.find(function(err, signals) {
			     if (err)
				       res.send(err);
           //console.log("INITIALIZED : " + signals[0]);
           //console.log(this);
			     //this.traffic_signals = signals; //TODO : change it to JSON.parse(signals) for development with json
           cb.traffic_signals = signals;
		  });
      //console.log(result);
    }

    Singleton.prototype.save_signals = function(TrafficSignal){
        TrafficSignal.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("saved signal!");
            }
        });
    }

    Singleton.prototype.add_signal = function(TrafficSignal){
        this.traffic_signals.push(TrafficSignal);
        Singleton.save_signal(TrafficSignal);
    }

    Singleton.prototype.get_signal = function(id){
      //cb = this;

      return new Promise(function(resolve, reject){
        TrafficSignalModel.find(function(err, signals) {
          if (err)
            res.send(err);

          //console.log(JSON.parse(signals));
          /*f(this.traffic_signals == null){
            this.traffic_signals = new  Array();
          }*/
          //console.log("SIGNALS " + signals);
          //this.traffic_signals = JSON.parse(signals);
          for(var signal of signals){
            //console.log('comparing '+ signal._id + ' with ' + id);
            if(signal._id.toString() == id){
              //console.log("Ya "+ signal)
              //cb.signal = signal;
              //callback(signal)
              resolve(signal);
            }
          }
        });
      });
    }

    Singleton.prototype.get_all_signals = function(){
      return this.traffic_signals;
    }

    Singleton.prototype.notify_signal = function(TrafficSignal, duration){
        //implement setTimeout with the socket.on("GREEN LIGHT", SERET CODE, SIGNAL ID);
    }

    return Singleton;

}());

module.exports = TrafficSignalManager;
