//var PreemptionCompletionListner = require('./PreemptionCompletionListner.js');


//console.log(PreemptionCompletionListner);

function Node(data){
    this.data = data;
    this.next = null;
    this.prev = null;
}

var LinkedList = function(){
    this.head = null;
    this.tail = null;
    this.size = 0;
}

LinkedList.prototype.printList = function(){
            if(this.head != null){
                var temp = this.head;
                console.log("The list is : ");
                while(temp != null){
                    console.log(temp.data);
                    temp = temp.next;
                }
            }else{
                console.log("The list is empty.");
            }
            
}

LinkedList.prototype.addAfter = function(after, data){
            var newNode = new Node(data);
            if(this.head != null){
                var temp = this.head;
                while(temp != null){
                    //console.log("Checking " + temp.data + " with " + after);
                    if(temp.data == after){
                        if(temp.next == null){
                            this.addBack(data);
                            return;
                        }
                        newNode.next = temp.next;
                        newNode.prev = temp;
                        temp.next.prev = newNode; 
                        temp.next = newNode;
                        this.size++;
                        return;
                    }
                    temp = temp.next;
                }
            }
}

LinkedList.prototype.addBack = function(data){
            var newNode = new Node(data);
            if(this.tail != null){
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.size++;
                this.updateTail();
            }else if(this.head != null){
                var temp = this.head;
                while(temp.next != null){
                    temp = temp.next;
                }
                temp.next = newNode;
                newNode.prev = temp;
                this.size++;
                this.updateTail();
                return;
            }
}

LinkedList.prototype.addFront = function(data){
            var newNode = new Node(data);
            if(this.head != null){
                //console.log("VAL : " + this.head.data);
                //console.log("Adding " + data + " before " + this.head.data);
                newNode.next = this.head;
                this.head.prev = newNode; //newNode.prev will be implicitly NULL
                this.head = newNode;
                this.size++;
            }else{
                //console.log("Adding new : " + data + ".");
                this.head = newNode;
                this.size++;
            }
            this.updateTail();
}

LinkedList.prototype.popFront = function(){
    if(this.head != null){
        var temp = this.head.next;
        temp.prev = null;
        this.head = temp;
        this.size--;
    }
}

LinkedList.prototype.popBack = function(){
    if(this.tail != null){
        if(this.size > 1){
            var temp = this.tail.prev;
            temp.next = null;
            this.tail = temp;
        }else{
            this.head = null;
            this.tail = null;
        }
        this.size--;
    }
}

LinkedList.prototype.popAfter = function(after){
    if(this.head != null){
        var temp = this.head;
        while(temp.data != after && temp != null){
            temp = temp.next;
        }

        if(temp.next.next != null){
            temp.next.next.prev = temp;
            temp.next = temp.next.next;
            this.size--;
        }else{
            this.popBack();
        }
        
    }
}

LinkedList.prototype.popElement = function(element){
    if(this.head != null){
        var temp = this.head;
        while(temp.data != element && temp != null){
            temp = temp.next;
        }

        if(temp.next != null){
            temp.prev.next = temp.next;
            temp.next.prev = temp.prev;
            this.size--;
        }else{
            this.popBack();
        }
        
    }
}

LinkedList.prototype.updateTail = function(){
        console.log("updateTail running");
        if(this.head != null){
            var temp = this.head;
            while(temp.next != null){
                temp = temp.next;
            }
            this.tail = temp;
            //console.log(this.tail);
            //this.printList();
        }
}

LinkedList.prototype.seekLastElement = function(){
        /*if(this.tail != null){
            return this.tail.data;
        }*/
        //console.log(this.tail.data);
        return this.tail;
}

LinkedList.prototype.get_size = function(){
        return this.size;
}

LinkedList.prototype.popElement = function(data){
        if(this.head != null){
            var temp = this.head;
            while(temp != null){
                if(temp._id == data._id){
                    if(this.head === temp){
                        temp.next.prev = null;
                        this.head = temp.next;
                        return;
                    }else{
                        temp.prev.next = temp.next;
                        temp.next.prev = temp.prev;
                        return;
                    }
                }
                temp=temp.next;
            }
        }
}

LinkedList.prototype.is_empty = function(){
    if(this.size){
        return false;
    }
    return true;
}

module.exports = LinkedList;
/*
var ll = new LinkedList();
ll.addFront(1);
//ll.printList();
//ll.printList();
ll.addBack(2);
//ll.printList();
ll.addBack(3);
//ll.printList();
ll.addBack(4);
//ll.printList();
ll.addBack(5);
//ll.printList();
ll.addFront(0);
//ll.printList();
ll.addFront(-1);
//ll.printList();
ll.addAfter(-1, 32);
ll.printList();

ll.popFront();
ll.printList();


ll.popFront();
ll.printList();


ll.popBack();
ll.printList();


ll.popBack();
ll.printList();


ll.popAfter(2);
ll.printList();

ll.popElement(2);
ll.printList();

console.log("The capacity is " + ll.size);
*/