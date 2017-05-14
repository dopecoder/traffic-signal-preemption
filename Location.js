var Client = require('node-rest-client').Client;
var API_KEY = 'AIzaSyBGdGBTzAqSxZ4rNH_rReF6TWVLgQNDEsA';

var Location = function(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
}

Location.prototype.get_distance = function(src_latitude, src_longitude, signals){
        //console.log('src_latitude ' + src_latitude + ' src_longitude ' + src_longitude + ' dest_latitude ' + dest_latitude + ' dest_longitude ' + dest_longitude);

        //console.log(final_url);


        //console.log('SIGNAL : '+ signals);
        //console.log('MAIN : ' + signal.points[0][0]);
        var pointsarr = new Array();

        for(var signal of signals){
          //console.log('SIGNAL : '+ signal);
          //console.log('MAIN : ' + signal.points[0][0]);
          //var arr = new Array();
          for(var i=0; i<signal.points.length;i++){
            //console.log("POINT : " + point);
            //signalArr.push(signal._id);
            pointsarr.push([signal.points[i][0], signal.points[i][1]]);

          }
        }

        var final_urls = new Array();
        var base_url = 'https://maps.googleapis.com';
        var url = base_url + '/maps/api/distancematrix/json?units=imperial';
        var origins = '&origins=' + src_latitude+','+src_longitude;

        for(var i=0; i<pointsarr.length; i++){
          var destination = '&destinations=' + pointsarr[i][0]+','+pointsarr[i][1];
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
            //console.log(final_url.substr(base_url.length));
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
                  //returns.push(row["elements"][0]["distance"]["value"]);
                }
                //console.log(sum);
                //returns.push(sum);
                if(counter == final_urls.length){
                  //console.log("RETURNS : " + returns);
                  resolve(returns);
                }
                //console.log(response['_httpMessage']['path']);
                //callback(signalArr, arr);
                //console.log('SUM ' + sum);
                //console.log(arr);
                //arr.push(sum);

                // raw response
                //console.log(response);
            });
          }
          //console.log("HEREEEEE : " + returns);
          //resolve(returns);

          // Only `delay` is able to resolve or reject the promise

          /*setTimeout(function() {
          resolve(42); // After 3 seconds, resolve the promise with value 42
        }, 3000);*/
        });

}

Location.prototype.get_nearest = function(TrafficSignalManager){
  //console.log(TrafficSignalManager);
  var signals = TrafficSignalManager.getInstance().get_all_signals();
  //console.log(signals);
  var arr = new Array();
  var signalArr = new Array();
  for(var signal of signals){
    //console.log('SIGNAL : '+ signal);
    //console.log('MAIN : ' + signal.points[0][0]);
    //var arr = new Array();
    for(var i=0; i<signal.points.length;i++){
      //console.log("POINT : " + point);
      signalArr.push(signal._id);
    }

  }
  //console.log(signalArr);
  //console.log("ARR");
  //console.log(arr);
  //var sortedarr = this.sort_distances(arr, signalArr);
  //return sortedarr[0];
  /*this.get_distance(this.latitude, this.longitude, signals).then(function(v) {
      console.log("GOT ARRAY OF DISTANCES : " + v);
      //var sorted_signals = this.sort_distances(v, signalArr);
      //TrafficSignalManager.getInstance().get_signal(sorted_signals[0]).then(function(v){
      //resolve(v);
  }).catch(function(v){
      console.log('ERROR : ' + v);
  });*/

  var cd = this;

  return new Promise(function(resolve, reject) {
    cd.get_distance(cd.latitude, cd.longitude, signals).then(function(v) {
        //console.log("get_distance resolved : " + v);
        var sorted_signals = cd.sort_distances(v, signalArr);
        //TrafficSignalManager.getInstance().get_signal(sorted_signals[0]).then(function(v){
        resolve(sorted_signals);
    }).catch(function(v){
        //console.log('ERROR : ' + v);
    });
  });
  //});
}
/*
Location.prototype.got_distances = function(data){
  console.log("ARR");
  console.log(arr);
  var sortedarr = this.sort_distances(arr, signalArr);
  return sortedarr[0];
}*/

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
