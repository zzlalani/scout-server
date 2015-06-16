/**
 * This model is responsible for information related
 * to a attendance.
 */
var db = require( __dirname + '/db' );

/**
 * Scehma of the attendance object.
 */
var attendanceSchema = db.Schema({
	
	id: String,
	guid: String,
	date: String,
	present: Object,
	name: String,
	lastUpdatedDate: Date,
	syncedDate: {
		type: Date,
		default: Date.now
	}
});

// http://stackoverflow.com/a/12670523
attendanceSchema.pre('save', function(next){
	now = new Date();
	this.syncedDate = now;
	next();
});

module.exports = db.model('Attendance', attendanceSchema);