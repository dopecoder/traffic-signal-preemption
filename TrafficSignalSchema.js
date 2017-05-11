var mongoose = require('mongoose');
var schema = mongoose.Schema;


var TrafficSignalSchema = new Schema({
    id : String,
    no_of_points : Number,
    points : [Location]
}); 

module.exports = mongoose.model(TrafficSignalModel, TrafficSignalSchema);