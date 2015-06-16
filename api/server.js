/**
 *
 * Developer: Muhammad Zeeshan
 *
 */
 
// Get the configurations
var config = require( __dirname + '/config' );

// Our logger for logging to file and console
var logger = require( __dirname + '/logger' );

// Instance for express server
var express = require( 'express' );

var app = module.exports =express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.bodyParser({limit: '50mb'}));


// We want to gzip all our content before sending.
app.use( express.compress() );
//app.use( express.urlencoded() );


// Support for cross domain.
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

 
// Configure all servers for this application
var contentServer = require( __dirname + '/providers/StaticContentServer' );
contentServer.setup( app );

var userProvider = require( __dirname + '/providers/User' );
userProvider.setup( app );

var scoutProvider = require( __dirname + '/providers/Scout' );
scoutProvider.setup( app );

var attendanceProvider = require( __dirname + '/providers/Attendance' );
attendanceProvider.setup( app );


// Start the http server
var httpServer;


var http = require('http');
httpServer = http.createServer(app);
// Make the server listen
httpServer.listen( config.http.port );

logger.info( 'Listening on port ' + config.http.port + ' with SSL ' + config.http.enableSSL );
