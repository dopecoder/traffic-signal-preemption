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
            console.log(traffic_signal);
            this.queues[traffic_signal] = new TrafficQueue();
            //this.queues[traffic_signal].print_queue();
        }
    }

    Singleton.prototype.addRequest = function(Request){
        /*if(!this.queues[Request.traffic_id]){
            this.queues[Request.traffic_id] = new TrafficQueue();
        }*/
        console.log(Request.traffic_id);
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

/*
var a = QueueManager.getInstance();
var b = QueueManager.getInstance();
console.log(a === b);*/
module.exports = QueueManager;




/*
var QueueManager = function() {  
    // the cached instance
    var instance;

    // carry over the prototype
    QueueManager.prototype = this;

    /*QueueManager.prototype.init_traffic_signal_queues = function(traffic_signals){
        this.traffic_signals = traffic_signals;
        for(traffic_signal in traffic_signals){
            this.queues[traffic_signal] = new Queue();
        }
    }

    QueueManager.prototype.addRequest = function(Request){
        if(!this.queues[Request.traffic_id]){
            this.queues[Request.traffic_id] = new Queue();
        }
        this.queues[traffic_id].enqueue(Request);
    }

    QueueManager.prototype.popRequest = function(traffic_id){
        return this.queues[traffic_id].dequeue();
    }

    QueueManager.prototype.seekLastElement = function(traffic_id){
        return this.queues[traffic_id].seekLastElement();
    }

    QueueManager.prototype.print = function(Request){
        this.queues[Request.traffic_id].print_queue();
    }

    QueueManager.prototype.check_and_notify = function(){
        for(traffic_signal in this.traffic_signals){
            if(this.queues[traffic_signal].is_empty()){
                PreemptionRequestCompletionListner.onResponse({traffic_id : traffic_signal});
            }
        }
    }

    /*QueueManager.prototype.call_continiously = function(){
        function callNTimes(n, time, fn) {
            function callFn() {
              if (--n < 0) return;
              fn();
              setTimeout(callFn, time);
            }
        setTimeout(callFn, time);
        }
    }
    // rewrite the constructor
    QueueManager = function() {
        return instance;
    };

    // the instance
    instance = new QueueManager();

    // reset the constructor pointer
    instance.constructor = QueueManager;

    // all the functionality
    //instance.queue = new Queue();
    instance.queues = new Array();
    instance.traffic_signals = new Array();
    //instance.queues['nithin'] = new Queue();

    return {
        getInstance: function(){
            return instance;
        },

        init_traffic_signal_queues: function(traffic_signals){
            instance.traffic_signals = traffic_signals;
            for(traffic_signal in traffic_signals){
                instance.queues[traffic_signal] = new Queue();
            }
        },

        addRequest: function(Request){
            if(!instance.queues[Request.traffic_id]){
                instance.queues[Request.traffic_id] = new Queue();
            }
            instance.queues[traffic_id].enqueue(Request);
        },

        popRequest: function(traffic_id){
            return instance.queues[traffic_id].dequeue();
        },

        seekLastElement: function(traffic_id){
            return instance.queues[traffic_id].seekLastElement();
        },

        print: function(Request){
            instance.queues[Request.traffic_id].print_queue();
        },

        check_and_notify : function(){
            for(traffic_signal in instance.traffic_signals){
                if(instance.queues[traffic_signal].is_empty()){
                    PreemptionRequestCompletionListner.onResponse({traffic_id : traffic_signal});
                }
            }
        }
    };
};

module.exports = QueueManager();

*/
/*

var singleA = QueueManager();
var singleB = QueueManager();
console.log( singleA === singleB ); // true  

var request = function(_id, other_details){
    this._id = _id;
    this.other_details = other_details;
}

//var qm = new QueueManager();
singleA.addRequest(new request(0, 100));
singleA.addRequest(new request(1, 200));
singleA.addRequest(new request(2, 300));
singleA.addRequest(new request(3, 400));
singleA.print();
singleA.popRequest();
singleA.print();
singleB.popRequest();
singleB.print();
singleB.popRequest();
singleB.print();
singleB.popRequest();
singleB.print();*/



/*function QueueManager(){
    this.queue = new Queue();
}

QueueManager.prototype.addRequest = function(Request){
    this.queue.enqueue(Request);
}

QueueManager.prototype.popRequest = function(Request){
    this.queue.dequeue();
}

QueueManager.prototype.print = function(Request){
    this.queue.print_queue();
}



var QueueManager = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton
    instance.queue = new Queue();
    instance.queues = new Array();
    instance.queues['nithin'] = new Queue();

    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    return {

        publicProperty: this.queue,

        addRequest: function(Request){
            this.queue.enqueue(Request);
            this.queues['nithin'].enqueue(Request);
        },

        popRequest : function(Request){
            this.queue.dequeue();
        },

        print : function(Request){
            this.queue.print_queue();
            this.queues['nithin'].print_queue();
        },
      // Public methods and variables
        publicMethod: function () {
            console.log( "The public can see me!" );
        },

      
    };

  };

  return {

    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();

// Usage:
*/
/*
var singleA = QueueManager();  
var singleB = QueueManager();  
console.log( singleA === singleB ); // true  

var request = function(_id, other_details){
    this._id = _id;
    this.other_details = other_details;
}

//var qm = new QueueManager();
singleA.addRequest(new request(0, 100));
singleA.addRequest(new request(1, 200));
singleA.addRequest(new request(2, 300));
singleA.addRequest(new request(3, 400));
singleA.print();
singleA.popRequest();
singleA.print();
singleB.popRequest();
singleB.print();
singleB.popRequest();
singleB.print();
singleB.popRequest();
singleB.print();
*/