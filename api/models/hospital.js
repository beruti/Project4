// fixed location
// ambulance will communicate with them directly

//require object relational manager to interact with database
var mongoose = require('mongoose');

var hospitalSchema = mongoose.Schema({
	// state key on left
	// state expected data type for value pair on right
	name: String
	//
	location: String
	lat 
	long
})

// instantiate Hospital object and pass it hospital model schema 
module.exports = mongoose.model('Hospital', hospitalSchema)