var LinkedList = require('./DoublyLinkedList.js');
var QueueManager = require('./QueueManager.js');

console.log(QueueManager);

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

//console.log(PreemptionCompletionListner);

/*var a = PreemptionRequestCompletionListner.getInstance();
var b = PreemptionRequestCompletionListner.getInstance();
a.addObserver(a);

console.log(a === b);*/



/*
var PreemptionRequestCompletionListner = function(){

    var instance;

    PreemptionRequestCompletionListner = function(){
        return instance;
    }

    PreemptionRequestCompletionListner.prototype = this;

    PreemptionRequestCompletionListner.prototype.addObserver = function(Request){
        this.observer_list.addBack(Request);
        if(QueueManager.seekLastElement(Request.traffic_id) == null){
            this.onResponse({traffic_id:Request.traffic_id});
        }
    }

    PreemptionRequestCompletionListner.prototype.removeObserver = function(Request){
        /*this.temp = this.list.head;
        while(this.temp){
            if(this.temp.data === Observer){
                if(this.temp === this.list.head){
                    this.list.head = this.temp.next;
                    this.list.head.prev = null;
                    return;
                    }else{
                    this.temp.prev.next = this.temp.next;
                    this.temp.next.prev = this.temp.prev;
                    return;
                }
            }
            this.temp = this.temp.next;
        }*/
        /*this.observer_list.popElement(Request);
    }

    PreemptionRequestCompletionListner.prototype.onResponse = function(response){
        this.temp = this.observer_list.head;
        while(this.temp){
            this.temp.data.notify(response.traffic_id);
            this.temp = this.temp.next;
        }
    }

    /*PreemptionRequestCompletionListner.prototype.check_and_notify = function(){
        for(queue in this.queues){
            if(queue.is_empty()){
                
            }
        }
    }*/

    /*instance = new PreemptionRequestCompletionListner();
    instance.constructor = PreemptionRequestCompletionListner;


    //declare all the variables as instance.
    instance.observer_list = new LinkedList();

    return instance;
}*/