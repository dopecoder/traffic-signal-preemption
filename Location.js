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

//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=12.927708,77.588773&destinations=12.928613,77.586343&key=AIzaSyBGdGBTzAqSxZ4rNH_rReF6TWVLgQNDEsA



