var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');


//User Schema
var AdminSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	password:{
		type:String

	},
	email:{
		type:String
	},
	name:{
		type:String
	},
	
});

AdminSchema.plugin(passportLocalMongoose)

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createUser = function(newUser , callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        	newUser.password = hash;
        	newUser.save(callback);
    	});
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	Admin.findOne(query,callback);
}

module.exports.getUserById = function(id, callback){
	Admin.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback ){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
    
}


