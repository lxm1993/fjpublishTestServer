/**
 * LOG
 */

'use strict';

var log4js = require("log4js");
var config = require("../config");


var Log = function () {};

var logger = null;

Log.prototype = {
	start: function() {
		log4js.configure({
			appenders: [{
				type: 'console'
			}],
			replaceConsole: true
		});

		logger = log4js.getLogger(config.log_id);
		logger.setLevel(config.log_level);
	},

	debug: function(args) {
		logger.debug(args);
	},

	error: function(args) {
		logger.error(args);
	},

	log: function(args) {
		logger.log(args);
	},

	info: function(args) {
		logger.info(args);
	},

	fatal: function(args) {
		logger.fatal(args);
	},

	warn: function(args) {
		logger.warn(args);
	},

	trace: function(args) {
		logger.trace(args);
	}
};


module.exports = new Log();