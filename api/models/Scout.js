/**
 * This model is responsible for information related
 * to a scout.
 */
var db = require(__dirname + '/db');

/**
 * Scehma of the scout object.
 */
var scoutSchema = db.Schema({

	id: String,
	firstName: String,
	lastName: String,
	picture: String,
	lastUpdatedDate: {
		type: Date,
		default: Date.now
	}
});

// http://stackoverflow.com/a/12670523
scoutSchema.pre('save', function(next){
	now = new Date();
	this.lastUpdatedDate = now;
	next();
});


module.exports = db.model('Scout', scoutSchema);