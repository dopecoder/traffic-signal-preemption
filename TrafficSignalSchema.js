var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Location = require('./Location.js');


var TrafficSignalSchema = new Schema({
    id : String,
    no_of_points : Number,
    points : [{location:[Number, Number], id:String}]
});

module.exports = mongoose.model('TrafficSignalModel', TrafficSignalSchema);
