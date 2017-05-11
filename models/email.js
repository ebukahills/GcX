var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var email = new Schema({
  email: String,
  time: { type: Date, default: Date.now }
});

module.exports = Email = mongoose.model('email', email);