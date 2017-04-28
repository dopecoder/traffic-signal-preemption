var QueueManager = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton
    this.queue = new Queue();

    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    return {

        addRequest: function(Request){
            this.queue.enqueue(Request);
        },

        popRequest : function(Request){
            this.queue.dequeue();
        },

        print : function(Request){
            this.queue.print_queue();
        },
      // Public methods and variables
        publicMethod: function () {
            console.log( "The public can see me!" );
        },

      publicProperty: "I am also public"
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

var singleA = mySingleton.getInstance();  
var singleB = mySingleton.getInstance();  
console.log( singleA === singleB ); // true  