/**
 *
 * Developer: Zeeshan Lalani
 *
 */
/**
 * This module is responsible for handling attendance api requests
 */
// Reference to the module to be exported
attendance = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 *
 */
attendance.setup = function(app) {

	// Our logger for logging to file and console
	var logger = require(__dirname + '/../logger');

	// config
	var config = require(__dirname + '/../config');

	var Attendance = require(__dirname + '/../models/Attendance');

	/* 
	 *  Developer: Zeeshan Lalani
	 *
	 *  api to add attendance
	 *
	 *  url: /api/attendance/add
	 *
	 *  method: POST
	 */
	app.post('/api/attendance/add', function(req, res) {

		logger.info('Inside /api/attendance/add POST');

		var responseJSON = {};
		var data = req.body;
		console.log(data.guid);
		if (data.guid) {

			Attendance.findOne({guid:data.guid}, function(err, attendance) {

				if (err) {
					logger.error(JSON.stringify(err));
					responseJSON.status = 'FAIL';
					responseJSON.message = JSON.stringify(err);
					// Response to client.
					res.jsonp(200, responseJSON);
					return;
				}

				// attendance found
				if (attendance != null) {

					attendance.date = data.date;
					
					for ( var i in data.present ) {
						// if attendance already exists update -> else add
						if ( attendance.present[i] ) {
						
							var docDate = new Date(attendance.present[i].dateTime);
							var appDate = new Date(data.present[i].dateTime);

							if ( appDate >= docDate ) {
								
								if ( data.present[i].stat == false ) {
									// delete attendace
									delete attendance.present[i];
								} else {
									// set new dateTime to present object
									attendance.present[i] = data.present[i];
								}	
							}
						} else {
							// dont save false stats
							if ( data.present[i].stat == true ) {
								attendance.present[i] = data.present[i];
							}
						}

					}
					
					attendance.markModified('present');

					attendance.name = data.name;
					attendance.lastUpdatedDate = data.lastUpdatedDate;
					attendance.save(function(err, a) {

						if (err) {
							// set on logger
							logger.error(JSON.stringify(err));

							responseJSON.status = 'FAIL';
							responseJSON.message = JSON.stringify(err);
							// Response to client.
							res.jsonp(200, responseJSON);
						}

						/// set on logger
						logger.info('Attendance with guid: ' + a.guid + ' updated successfully.');

						responseJSON.status = 'OK';
						// Response to client.
						res.jsonp(200, responseJSON);

					}); // save scout end

				} else {
					var attendance = new Attendance();

					attendance.guid = data.guid;
					attendance.date = data.date;
					attendance.present = data.present;
					attendance.name = data.name;
					attendance.lastUpdatedDate = data.lastUpdatedDate;

					attendance.save(function(err, a) {

						if (err) {
							// set on logger
							logger.error(JSON.stringify(err));

							responseJSON.status = 'FAIL';
							responseJSON.message = JSON.stringify(err);
							// Response to client.
							res.jsonp(200, responseJSON);
						}

						/// set on logger
						logger.info('Attendance with guid: ' + a.guid + ' added successfully.');

						responseJSON.status = 'OK';
						// Response to request.
						res.jsonp(200, responseJSON);

					}); // save scout end

				}
			});

		} else {

			responseJSON.status = 'FAIL';
			responseJSON.message = 'Invalid request';
			// Response to client.
			res.jsonp(200, responseJSON);

		}

	});

	/**
	 * get scouts greater than given date
	 *
	 * @params:
	 *
	 * 1- date: String
	 *
	 **/
	app.get('/api/attendance/list/:date', function(req, res) {

		logger.info('Inside /api/attendance/list/:date GET');
		logger.info('date: ' + req.params.date);

		// Construct response JSON
		var responseJSON = {};

		var date = req.params.date;
		date = date.replace('+', ' ');
		logger.info('$gt date ' + new Date(date).toISOString());
		
		var condition = {
			syncedDate: {
				'$gt': new Date(date).toISOString()
			}
		};

		// get list of scouts
		// mongo query will work on iso date
		Attendance.find(condition, function(err, attendance) {

			if (err) {
				logger.error(JSON.stringify(err));
				responseJSON.status = 'FAIL';
				responseJSON.message = JSON.stringify(err);
				// Response to client.
				res.jsonp(200, responseJSON);
				return;
			}

			// scouts found
			if ( attendance.length ) {

				logger.info('attendance found.');

				responseJSON.status = 'OK';
				responseJSON.data = attendance;
				// Response to client.
				res.jsonp(200, responseJSON);

			} else {

				logger.info('no attendance found.');

				responseJSON.status = 'OK';
				responseJSON.data = [];
				// Response to client.
				res.jsonp(200, responseJSON);
			}
		});

	});


}