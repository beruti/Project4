var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  github: String,
  website: String
});

module.exports = mongoose.model('Contact', contactSchema);