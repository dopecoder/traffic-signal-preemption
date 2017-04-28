var LinkedList = require('./DoublyLinkedList.js');
//var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');

//console.log(PreemptionCompletionListner);

var TrafficQueue = function(){
    this.list = new LinkedList();    
}

TrafficQueue.prototype.enqueue = function(element){
    //check if there are any elements
    /*if(this.list.get_size() > 0){
        this.list.addFront(element);
        //var listner = PreemptionRequestCompletionListner.getInstance();
        //listner.addObserver(element);
        //attach a listner to the element.
    }else{
        this.list.addFront(element);
        //execute the function.
    }*/
    this.list.addFront(element);
    //element.register_to_observer();
    //var preem = PreemptionCompletionListner.getInstance();
    //console.log(PreemptionCompletionListner);
    //PreemptionCompletionListner.getInstance().addObserver(element);
}

TrafficQueue.prototype.dequeue = function(){
    return this.list.popBack();
}

TrafficQueue.prototype.get_size = function(){
    return this.list.get_size();
}

TrafficQueue.prototype.print_queue = function(){
    this.list.printList();
}

TrafficQueue.prototype.seekLastElement = function(){
    return this.list.seekLastElement();// || null;
}

TrafficQueue.prototype.is_empty = function(){
    return this.list.is_empty();
}


module.exports = TrafficQueue;