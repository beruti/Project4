var mongoose =  require('mongoose')

var patientSchema = mongoose.Schema({

	name: String,
	//age: Number,
	// will need to add logic to keep updating their age
	// current data, age - deduce dob 
	// increment based on year
	//bloodtype : String,
	//conditions: String,
	//medications: String,
	//residence: String,	
	emergencyassistance: Boolean,
	location: null,

})

module.exports = mongoose.model('Patient', patientSchema)