var LinkedList = require('./DoublyLinkedList.js');
var TrafficSignalManager = require('./TrafficSignalManager.js');

var PreemptionRequestHandler = (function(){

    "use strict";
    var instance;

    function Singleton(){
        if(instance){
            return instance;
        }
        instance = this;

        //all instance variables here;
        this.api_key = new Array(); // need to be initialized with actual some 10 keys lets say.
        this.request_key_list = new Array(); 
        this.request_list = new Array();
        
    }

    //instance accessor
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }

    Singleton.prototype.onAuthorize = function(api_key){
        for(var key of this.api_key){
            if(key == api_key){
                //generate a key and push it to this.request_key_list
                //respond with the key generated.
            }
        }

    }

    Singleton.prototype.onRegister(Request) = function(){
        for(var request_key of request_key_list){
            if(request_key == Request._id){
                request_list[request] = Request;
                return true;
            }
        }
        return false;

    }

    Singleton.prototype.onLocationChanged = function(Request){
        for(var request_key of request_key_list){
            if(request_key == Request._id){
                request = request_list[request];
                var location = new Location(Request.direction_data.latitude, Request.direction_data.longitude);
                request.update(location);
            }
        }
    }

}());