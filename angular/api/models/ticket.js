var mongoose =  require('mongoose')

var ticketSchema = mongoose.Schema({

	//patient = //crosspopulate with patientSchema
	location: null,
	criticallevel: Number

})

module.exports = mongoose.model('Ticket', ticketSchema)