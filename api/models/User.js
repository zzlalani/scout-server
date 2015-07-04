/**
 * This model is responsible for information related
 * to a user.
 */
var db = require( __dirname + '/db' );

/**
 * Scehma of the user object.
 */
var userSchema = db.Schema({
	
    id:String,
    userName :String,
    password: String,
    name: String,
    access: String,
    lastUpdatedDate: {
		type: Date,
		default: Date.now
	}
});

// http://stackoverflow.com/a/12670523
userSchema.pre('save', function(next){
	now = new Date();
	this.lastUpdatedDate = now;
	next();
});

module.exports = db.model('User', userSchema);