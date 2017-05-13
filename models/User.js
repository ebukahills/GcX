var mongoose = require('mongoose')
var Schema = mongoose.Schema

var passportLocalMongoose = require('passport-local-mongoose');

var id = require('shortid');

var UserSchema = new Schema({
	username: String,
	password: String,
	name: String,
	phone: Number,
	country: String,
	transactions: Array,
	registered: { type: Date, default: Date.now },
	uid: { type: String, default: id.generate}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
