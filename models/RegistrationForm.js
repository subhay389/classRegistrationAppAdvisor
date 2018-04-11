var mongoose = require('mongoose');

var registrationFormSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  degree: String,
  email: String,
  advisor: String, 
  term: String, 
  crns: String,
  isApproved: {type: Boolean, default: false},
  pin: {type: String, default: 'Not Approved'},
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RegistrationForm', registrationFormSchema);
