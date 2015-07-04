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

    /* 
     *  Developer: Zeeshan Lalani
     *
     *  api to add user
     *
     *  url: /api/user/add
     *
     *  method: POST
     *
     *  @params:
     *
     *  1- name: String
     *  2- userName: String
     *  3- password: String
     *  4- access: String
     */
    app.post('/api/user/add', function(req, res) {

        logger.info('Inside /api/user/add POST');

        var responseJSON = {};
        var data = req.body;

        if (data.name && data.userName && data.password && data.access) {

            User.findOne({
                'userName':data.userName
            }, function(err, u) {

                if (err) {
                    logger.error(JSON.stringify(err));
                    responseJSON.status = 'FAIL';
                    responseJSON.message = JSON.stringify(err);
                    // Response to client.
                    res.jsonp(200, responseJSON);
                    return;
                }

                // scout found
                if (u != null) {
                    var message = "User Name already exists";
                    logger.info(message);

                    responseJSON.status = 'FAIL';
                    responseJSON.message = message;
                    // Response to client.
                    res.jsonp(200, responseJSON);
                }
            });

            var user = new User();

            user.name = data.name;
            user.userName = data.userName;
            user.password = data.password;
            user.access = data.access;

            user.save(function(err, u) {

                if (err) {
                    // set on logger
                    logger.error(JSON.stringify(err));

                    responseJSON.status = 'FAIL';
                    responseJSON.message = JSON.stringify(err);
                    // Response to client.
                    res.jsonp(200, responseJSON);
                }

                /// set on logger
                logger.info('User with Name: ' + u.name + ' and UserName: ' + u.userName + ' added successfully.');

                responseJSON.status = 'OK';
                // Response to request.
                res.jsonp(200, responseJSON);

            }); // save scout end

        } else {

            responseJSON.status = 'FAIL';
            responseJSON.message = 'Invalid request';
            // Response to client.
            res.jsonp(200, responseJSON);

        }

    });

    /* 
     *  Developer: Zeeshan Lalani
     *
     *  api to update User
     *
     *  url: /api/user/update/:id
     *
     *  method: POST
     *
     *  @params:
     *
     *  1- name: String
     *  2- userName: String
     *  3- access: String
     */
    app.post('/api/user/update/:id', function(req, res) {

        logger.info('Inside /api/user/update/:id POST');
        logger.info('id: ' + req.params.id);

        var responseJSON = {};
        var data = req.body;
        var id = req.params.id;

        if (data.userName && data.name && data.access) {

            User.findOne({_id:id}, function(err, user) {

                if (err) {
                    logger.error(JSON.stringify(err));
                    responseJSON.status = 'FAIL';
                    responseJSON.message = JSON.stringify(err);
                    // Response to client.
                    res.jsonp(200, responseJSON);
                    return;
                }

                // user found
                if (user != null) {

                    logger.info('scouts found.');

                    user.name = data.name;
                    user.userName = data.userName;
                    user.access = data.access;
                    
                    if (data.password != '') {
                        user.password = data.password;
                    }

                    user.save(function(err, u) {

                        if (err) {
                            // set on logger
                            logger.error(JSON.stringify(err));

                            responseJSON.status = 'FAIL';
                            responseJSON.message = JSON.stringify(err);
                            // Response to client.
                            res.jsonp(200, responseJSON);
                        }

                        /// set on logger
                        logger.info('User with Name: ' + u.name + ' and UserName: ' + u.userName + ' updated successfully.');

                        responseJSON.status = 'OK';
                        responseJSON.data = u;
                        // Response to client.
                        res.jsonp(200, responseJSON);

                    }); // save scout end

                } else {

                    logger.info('user not found.');

                    responseJSON.status = 'FAIL';
                    responseJSON.data = {};
                    // Response to client.
                    res.jsonp(200, responseJSON);
                }
            });

        } else {

            responseJSON.status = 'FAIL';
            responseJSON.message = 'Invalid request';
            // Response to client.
            res.jsonp(200, responseJSON);

        }

    });

    app.get('/api/users/list', function(req, res) {

        logger.info('Inside /api/users/list GET');

        // Construct response JSON
        var responseJSON = {};

        // get list of users
        // mongo query will work on iso date
        User.find({}, 'id name userName access lastUpdatedDate', function(err, users) {

            if (err) {
                logger.error(JSON.stringify(err));
                responseJSON.status = 'FAIL';
                responseJSON.message = JSON.stringify(err);
                // Response to client.
                res.jsonp(200, responseJSON);
                return;
            }

            // users found
            if (users != null && users.length) {

                logger.info('users found.');

                responseJSON.status = 'OK';
                responseJSON.data = users;
                // Response to client.
                res.jsonp(200, responseJSON);

            } else {

                logger.info('no users found.');

                responseJSON.status = 'OK';
                responseJSON.data = [];
                // Response to client.
                res.jsonp(200, responseJSON);
            }
        });

    });

    app.get('/api/user/remove/:id', function(req, res) {

        logger.info('Inside /api/user/remove/:id GET');
        logger.info('id: ' + req.params.id);

        // Construct response JSON
        var responseJSON = {};
        var id = req.params.id;
        // get list of scouts
        // mongo query will work on iso date
        User.remove({ _id:id }, function (err, data) {
            if (err) {
                logger.error(JSON.stringify(err));
                responseJSON.status = 'FAIL';
                responseJSON.message = JSON.stringify(err);
                // Response to client.
                res.jsonp(200, responseJSON);
                return;
            }

            if ( data == 1 ) {
                logger.info('Delete: ID '+ id +' deleted successfully.');
                responseJSON.status = 'OK';
                // Response to client.
                res.jsonp(200, responseJSON);
            } else {
                logger.info('Delete: ID '+ id +' delete fail.');
                responseJSON.status = 'FAIL';
                // Response to client.
                res.jsonp(200, responseJSON);
            }
            

            return;
        });

    });


}