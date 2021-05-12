/*
 * Creat and export configuration vaiables
 * 
 */

const { env } = require("process");

// Container for all the enviroments

var environments = {};

// staging (defautl) environment

environments.staging = {
	'httpPort': 3000,
	'httpsPort':3001,
	'envName': 'Staging',
	'hashingSecret': 'thisIsASecret',
	'maxChecks': 5,
	'twilio': {
		'accountSid': 'ACb32d411ad7fe886aac54c665d25e5c5d',
		'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
		'fromPhone': '+15005550006'
	},
	'templateGlobals': {
		'appName': 'Delivery Pizza',
		'companyName': 'Delivery Pizza CrazyMania Inc',
		'yearCreated': '2021',
		'baseUrl':'http://localhost:5000/'
    }

};


// Prdoction environmnet
environments.production = {
	'httpPort': 5000,
	'httpsPort':5001,
	'envName': 'production',
	'hashingSecret': 'thisIsAlsoASecret',
	'maxChecks': 5,
	'twilio': {
		'accountSid': '',
		'authToken': '',
		'fromPhone': ''
	},
	'templateGlobals': {
		'appName': 'Delivery Pizza',
		'companyName': 'Delivery Pizza CrazyMania Inc',
		'yearCreated': '2021',
		'baseUrl': 'http://localhost:5000/'
	}
};

// Determine with enviroment was
//passes as a command - line argumnet
var currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check taht the current enviroment is one of the envoronmest above,
//if note, default to staging
var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;