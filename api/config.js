/**
 * This module is responsible for maintaining all configurations
 * that are used site wide.
 */
var config = {}

// Application Information
config.app = {}
config.app.mode = {}
config.app.user = {}
config.app.errorUrl   = '/error';
config.app.mode.DEVELOPMENT = 'development';
config.app.mode.PRODUCTION = 'production';
config.app.mode.current = config.app.mode.DEVELOPMENT;


// HTTP server configuration
config.http = {}
config.http.port = (config.app.mode.current == config.app.mode.DEVELOPMENT ) ? 3000 : 80;
config.http.enableSSL = false;

// for ssl and production
if ( config.app.mode.current == config.app.mode.PRODUCTION && config.http.enableSSL == true ) {
	config.http.port = 443;
}

config.http.serverKey ='';
config.http.serverCertificate = '';

// Log files
config.logger = {}
config.logger.errorFile = __dirname + '/../logs/error.log';
config.logger.consoleFile = __dirname + '/../logs/console.log';
config.logger.maxFileSize = 1000000;
config.logger.maxFiles = 1;

// Db Configuration
config.db = {}
// config.db.host = 'mongodb://admin:admin@ds041432.mongolab.com:41432/smartattendance'
config.db.host = 'mongodb://dbuser:dbuser@ds031862.mongolab.com:31862/scouts-attendance'
config.db.modelVersion = 1.0;
module.exports = config;