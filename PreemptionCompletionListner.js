var LinkedList = require('./DoublyLinkedList.js');
var QueueManager = require('./QueueManager.js');
var TrafficSignalManager = require('./TrafficSignalManager.js');

console.log("Yaay! " + QueueManager);
console.log("Yaay2! " + TrafficSignalManager);

var PreemptionCompletionListner = (function () {
    "use strict";
    var instance; //prevent modification of "instance" variable

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        //Singleton initialization code
        this.observer_list = new LinkedList();
    }

    //instance accessor
    Singleton.getInstance = function () {
        return instance || new Singleton();
    }

    Singleton.prototype.addObserver = function(Request){
        console.log(Request);
        this.observer_list.addFront(Request);
        console.log("Running addObserver");
        console.log(this.observer_list.get_size());
        //if(QueueManager.getInstance().seekLastElement(Request.traffic_id) == null){
        //    this.onResponse({traffic_id:Request.traffic_id});
        //}
    }

    Singleton.prototype.removeObserver = function(Request){
        return this.observer_list.popElement(Request);
    }

    Singleton.prototype.onResponse = function(response){
        console.log("onResponse called with traffic id : " + response.traffic_id);
        console.log(this.observer_list.get_size());
        this.temp = this.observer_list.head;
        while(this.temp){
            this.temp.data.notify(response.traffic_id);
            this.temp = this.temp.next;
        }
    }

    return Singleton;
}());

module.exports = PreemptionCompletionListner;
