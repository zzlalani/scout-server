/**
 * Copyright RIKSOF (Private) Limited 2015 All Rights Reserved.
 *
 * THIS WORK CONTAINS TRADE SECRET AND PROPRIETARY INFORMATION WHICH IS THE
 * PROPERTY OF RIKSOF (PRIVATE) LIMITED OR ITS LICENSORS AND IS SUBJECT TO LICENSE TERMS.
 *
 * Developer: Muhammad Zeeshan
 *
 */
 
/**
 * This module is responsible for configuring how the server
 * handles requests for static content, images, javascript
 * and html
 */

// Reference to the module to be exported
contentServer = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle JavaScript requests. If the server is being
 * run in development mode, then we expose these directories:
 *
 * - js
 * - libs
 * - tests
 *
 * Otherwise, only the libs directory is exposed. Contents of
 * the js directory are combined to a minimised javascript file.
 */
contentServer.setup = function( app ) {
	// Get the configurations
	var config = require( __dirname + '/../config' );
	
	// Serve the libs folder
	var express = require('express');
	
	app.use( '/', express.static( __dirname + '/../html' ));	

	app.use( '/public', express.static( __dirname + '/../../public'));	
	app.use( '/js', express.static( __dirname + '/../../public/js' ));

	// Serve the logs files
	app.use( '/logs', express.static( __dirname + '/../../logs' ));
	
	
	// Generate error to test correct handling
	app.get( config.app.errorUrl, function(req, res) {
	    throw 'This is a generated error. All requests to this URL will always throw this error';
	});
}
