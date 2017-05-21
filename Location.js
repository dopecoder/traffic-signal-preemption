var Client = require('node-rest-client').Client;
var API_KEY = 'AIzaSyBGdGBTzAqSxZ4rNH_rReF6TWVLgQNDEsA';
const MIN_LOCATIONS = 10;

var Location = function(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
}

Location.prototype.get_distance = function(src_latitude, src_longitude, signals){
        var pointsarr = new Array();

        for(var signal of signals){
          for(var i=0; i<signal.points.length;i++){
            pointsarr.push([signal.points[i][0], signal.points[i][1]]);
          }
        }

        var final_urls = new Array();
        var base_url = 'https://maps.googleapis.com';
        var url = base_url + '/maps/api/distancematrix/json?units=imperial';
        var origins = '&origins=' + src_latitude+','+src_longitude;

        for(var i=0; i<pointsarr.length; i++){
          var destination = '&destinations=' + pointsarr[i].location[0]+','+pointsarr[i].location[1];
          var final_url = url+origins+destination+'&key='+API_KEY;
          final_urls.push(final_url);
        }
        //console.log('URLS : ' +final_urls);
        var client = new Client();
        // direct way

        return new Promise(function(resolve, reject) {
          var sum = 0;
          var returns = new Array();
          for(var final_url of final_urls){
            returns.push(final_url.substr(base_url.length));
          }
          var counter = 0;
          for(var final_url of final_urls){
            client.get(final_url, function (data, response) {
                // parsed response body as js object
                //console.log(data);
                counter=counter+1;
                //console.log(response['socket']['_httpMessage']['path']);
                var res = response['socket']['_httpMessage']['path'];
                for(var row of data["rows"]){
                  var elements = row["elements"];
                  //console.log(elements[0]["distance"]);
                  //console.log("ADDing " + row["elements"][0]["distance"]["value"])
                  sum = sum + row["elements"][0]["distance"]["value"];
                  for(var i=0; i<returns.length; i++){
                    if(returns[i] == res){
                      returns[i] = row["elements"][0]["distance"]["value"];
                    }
                  }
                }
                if(counter == final_urls.length){
                  resolve({distances:returns, points:pointsarr});
                }
            });
          }
        });
}
Location.prototype.get_correct_signal = function(TrafficSignalManager, locations){
  //var src_lat = this.latitude;
  //var src_lon = this.longitude;

  var signals = TrafficSignalManager.getInstance().get_all_signals();
  //console.log(signals);
  var arr = new Array();
  var signalArr = new Array();
  for(var signal of signals){
    for(var i=0; i<signal.points.length;i++){
      //console.log("POINT : " + point);
      console.log(signal._id);
      signalArr.push(signal._id);
    }
  }

  function getSmallest(arr){
    var smallest = arr[0];
    var smallestIndex = 0;
    for(var i=1; i<arr.length; i++){
      if(arr[i] < smallest){
        var smallest = arr[i];
        var smallestIndex = i;
      }
    }
    return smallestIndex;
  }

  function isNegative(num){
    if (num < 0) {
      return true;
    }
    return false;
  }

  var cd = this;

  return new Promise(function(resolve, reject) {
    var delta = new Array();
    var indexcounter = new Array();
    var distances = new Array();


    for(var i=0; i<locations.length; i++){
	     var src_lat = locations[i].latitude;
  	   var src_lon = locations[i].longitude;

       cd.get_distance(src_lat, src_lon, signals).then(function(v) {
        console.log("get_distance resolved : " + v);
        distances.push(v.distances);
        var sorted_signals = cd.sort_distances(v, signalArr);
        //TrafficSignalManager.getInstance().get_signal(sorted_signals[0]).then(function(v){
	       console.log("DISTANCES LENGTH : ");
	       console.log(distances.length);
	       console.log(distances);
	       console.log("MIN_LOCATIONS LENGTH : ");
	       console.log(MIN_LOCATIONS);
        if (distances.length == MIN_LOCATIONS) {
          //calculate delta
          var arr; // = new Array();
          for(var i=1; i<distances.length; i++){
            arr = new Array();
            var distanceToAllSignalPoints = distances[i];
            var distanceToPreviousSignalPoints = distances[i-1];
            var smallestToAllSignalPoints = getSmallest(distanceToAllSignalPoints);
            var smallestToPreviousSignalPoints = getSmallest(distanceToAllSignalPoints);

            for(var j = 0; j < distances[i].length; j++){
              arr.push(distanceToAllSignalPoints[j] - distanceToPreviousSignalPoints[j]);
            }
            if(isNegative(arr[smallestToAllSignalPoints])){
                indexcounter.push(smallestToAllSignalPoints);
            }
            delta.push(arr);
          }
	         console.log("DELTA : ");
           console.log(delta);
	         console.log("COUNTERS : ");
           console.log(indexcounter);
           console.log(v.points);
	         console.log(v.points[indexcounter[indexcounter.length - 1]]);
          //resolve(v.points[indexcounter[indexcounter.length - 1]]);
          for(var i = 0; i<signals.length; i++){
            if (signals[i]._id == v.points[indexcounter[indexcounter.length - 1]].id) {
              resolve(signals[i]);
            }
          }
          //go through each in distance array to get the smallest (negetive most delta) and log the index
          //go through each in delta array and check if the i has -ve delta, if push it to occurance array
          //in occurance array add the count to every point and return that signal.
        }
        //resolve(sorted_signals);
    }).catch(function(v){
        console.log('ERROR : ' + v);
    });
    }
  });
}

Location.prototype.sort_distances = function(arr, signalArr){
  var arr = this.quickSort(arr, signalArr, 0, arr.length - 1);
  return arr;
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
    i = left,
    j = right;

    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            this.swap(items, i, j, signal_array);
            i++;
            j--;
        }
    }
    return i;
}

Location.prototype.quickSort = function(items, signal_array, left, right) {

    var index;

    if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;

        index = this.partition(items, left, right, signal_array);

        if (left < index - 1) {
            this.quickSort(items, left, index - 1, signal_array);
        }
        if (index < right) {
            this.quickSort(items, index, right, signal_array);
        }
    }
    console.log('signal_array ' + signal_array);
    return signal_array;
}

module.exports = Location;

// first call
//var result = quickSort(items);


//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=12.927708,77.588773&destinations=12.928613,77.586343&key=AIzaSyBGdGBTzAqSxZ4rNH_rReF6TWVLgQNDEsA
