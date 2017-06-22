var mongoose = require('mongoose');
// Add passport local mongoose to the user model
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
   username: String, 
   password: String
});

// Below userSchema or after defining schema
userSchema.plugin(passportLocalMongoose);

// adds the method of passport local mongoose to userSchema

module.exports = mongoose.model('User', userSchema);