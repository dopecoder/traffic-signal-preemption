var Client = require('node-rest-client').Client;

var API_KEY = 'AIzaSyBGdGBTzAqSxZ4rNH_rReF6TWVLgQNDEsA';

var Location = function(){

    this.latitude;
    this.longitude;
}

Location.prototype.get_distance = function(src_latitude, src_longitude, dest_latitude, dest_longitude){
        var client = new Client();
        var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
        var origins = src_latitude+','+src_longitude;
        var destination = dest_latitude+','+dest_longitude;
        var final_url = url+'&'+origins+'&'+destination+'&key='+API_KEY;
        // direct way 
        client.get(final_url, function (data, response) {
            // parsed response body as js object 
            console.log(data);
            // raw response 
            console.log(response);
        });
}

Location.prototype.get_distane_to_all_signals = function(TrafficSignals){

}

Location.prototype.sort_distances = function(){

}

Location.prototype.swap = function(items, firstIndex, secondIndex, signal_array){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;

    temp = signal_array[firstIndex];
    signal_array[firstIndex] = signal_array[secondIndex];
    signal_array[secondIndex] = temp;
}

Location.prototype.partition = function(items, left, right, signal_array) {

    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;


    while (i <= j) {

        while (items[i] < pivot) {
            i++;
        }

        while (items[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

Location.prototype.quickSort = function(items, left, right, signal_array) {

    var index;

    if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;


        index = partition(items, left, right, signal_array);

        if (left < index - 1) {
            quickSort(items, left, index - 1, signal_array);
        }

        if (index < right) {
            quickSort(items, index, right, signal_array);
        }

    }

    return signal_array;
}

// first call
var result = quickSort(items);


//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=12.927708,77.588773&destinations=12.928613,77.586343&key=AIzaSyBGdGBTzAqSxZ4rNH_rReF6TWVLgQNDEsA



