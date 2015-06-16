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
    name: String

});

module.exports = db.model('User', userSchema);