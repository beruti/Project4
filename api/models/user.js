var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({

	// firstName: {type: String}, //, unique: true, required: true}
	// lastName: {type: String},
	//patientName: {type: String},
	email: {type: String},
	//age: Number,
	// will need to add logic to keep updating their age
	// current data, age - deduce dob 
	// increment based on year
	//bloodtype : String,
	//conditions: String,
	//medications: String,
	//residence: String,	
	password: {type: String}//, required: true
	//emergencyassistance: Boolean,
	//location: null
})

//PASSPORT AUTHENTICATION
// encrypt and salt password on signup
userSchema.statics.encrypt = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// validate password with check on prexisting
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema)