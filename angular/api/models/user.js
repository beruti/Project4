var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
	email: {type: String},
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