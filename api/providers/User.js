/**
 *
 * Developer: Muhammad Zeeshan
 *
 */
/**
 * This module is responsible for handling user api requests
 */
// Reference to the module to be exported
user = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 *
 */
user.setup = function(app) {


    // Our logger for logging to file and console
    var logger = require(__dirname + '/../logger');

    // config
    var config = require(__dirname + '/../config');

    var User = require(__dirname + '/../models/User');

    // app.get('/', function(req, res) {

    //     res.write('<h1>Welcome to Scout Api</h1>');
    //     res.end();

    // });

    /* 
     *  Developer: Muhammad Zeeshan
     *
     *  api for user login
     *
     *  url: /api/login
     *
     *  method: POST
     *
     *  @params:
     *
     *  1- username
     *  2- password
     */
    app.post('/api/login', function(req, res) {

        logger.info('Inside /api/login POST');

        var responseJSON = {};
        var data = req.body;

        if (data.username && data.password) {

            logger.info('username: ' + data.username + ' password: ' + data.password);

            User.findOne({
                userName: data.username,
                password: data.password,
            }, function(err, user) {

                if (err) {
                    logger.error(JSON.stringify(err));
                    responseJSON.status = 'FAIL';
                    responseJSON.message = JSON.stringify(err);
                    // Response to client.
                    res.jsonp(200, responseJSON);

                    return;
                }

                if (user != null) {
                    var userObject = {
                        id: user._id,
                        name: user.name,
                        userName: user.userName
                    };
                    responseJSON.status = 'OK';
                    responseJSON.user = userObject;
                    res.jsonp(200, responseJSON);

                } else {

                    responseJSON.status = 'FAIL';
                    responseJSON.message = 'User does not exist';
                    // Response to client.
                    res.jsonp(200, responseJSON);
                }



            }); // form find one end
        } else {

            responseJSON.status = 'FAIL';
            responseJSON.message = 'Invalid request';
            // Response to client.
            res.jsonp(200, responseJSON);

        }

    });


}