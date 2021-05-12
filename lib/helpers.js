/*
 * 
 * HELPER SCRIP LIB 
 * 
 */

//dependecies

var https = require("https");
var StringDecoder = require("string_decoder").StringDecoder;
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');
var config = require('./config');


//Instanciate
helpers = {};

helpers.parseJsonToObject = function (str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function (strLength) {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        // Define all the possible characters that could go into a string
        var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        // Start the final string
        var str = '';
        for (i = 1; i <= strLength; i++) {
            // Get a random charactert from the possibleCharacters string
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            // Append this character to the string
            str += randomCharacter;
        }
        // Return the final string
        return str;
    } else {
        return false;
    }
};


helpers.postStripPaymentMethod= function (card,callback) {
    var card = typeof (card) == 'object' ? card : false;

    if (card) {

        var stringPayload = querystring.stringify(card);

        //Configure request details
        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.stripe.com',
            'method': "POST",
            'path': '/v1/payment_methods',
            'auth': "sk_test_4eC39HqLyjWDarjtT1zdp7dc:",
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)

            }
        }

        //Instantiate teh request
        var req = https.request(requestDetails, function (res) {

            var buffer = "";
            res.on("data", function (data) {
                buffer += decoder.write(data);
            });

            res.on("end", function () {
                buffer += decoder.end();
                var status = res.statusCode;
                if (status == 200 || status == 201) {
                    paymentMethodObj = JSON.parse(buffer);
                    callback(false, paymentMethodObj);
                } else {
                    var errorObj = JSON.parse(buffer);
                    callback(res.statusCode, errorObj);
                }
            });

            var decoder = new StringDecoder("utf-8");

        });

        // Bind to the error event so it doesn't get thrown
        req.on('error', function (e) {
            callback(e);
        });

        req.write(stringPayload);
        req.end();

    } else {
        callback('Given parameters were missing or invalid');
    }

};


helpers.postStripPayment_intents = function (order, callback) {

    var order = typeof (order) == 'object' ? order : false;

    if (order) {

        var stringPayload = querystring.stringify(order);

        //Configure request details
        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.stripe.com',
            'method': "POST",
            'path': '/v1/payment_intents',
            'auth': "sk_test_4eC39HqLyjWDarjtT1zdp7dc:",
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)

            }
        }

        //Instantiate teh request
        var req = https.request(requestDetails, function (res) {

            var buffer = "";
            res.on("data", function (data) {
                buffer += decoder.write(data);
            });

            res.on("end", function () {
                buffer += decoder.end();
                var status = res.statusCode;
                if (status == 200 || status == 201) {
                    paymentIntentsObj = JSON.parse(buffer);
                    callback(false, paymentIntentsObj);
                } else {
                    var errorObj = JSON.parse(buffer);
                    callback(res.statusCode, errorObj);
                }
            });

            var decoder = new StringDecoder("utf-8");

        });

        // Bind to the error event so it doesn't get thrown
        req.on('error', function (e) {
            callback(e);
        });

        req.write(stringPayload);
        req.end();

    } else {
        callback('Given parameters were missing or invalid');
    }

};


helpers.postStripPayment_instentsConfirm = function (payId, callback) {

    var payId = typeof (payId) == 'string' && payId.trim().length > 0 ? payId : false;

    if (payId) {


        //Configure request details
        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.stripe.com',
            'method': "POST",
            'path': '/v1/payment_intents/' + payId + '/confirm',
            'auth': "sk_test_4eC39HqLyjWDarjtT1zdp7dc:",
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        }

        //Instantiate teh request
        var req = https.request(requestDetails, function (res) {

            var buffer = "";
            res.on("data", function (data) {
                buffer += decoder.write(data);
            });

            res.on("end", function () {
                buffer += decoder.end();
                var status = res.statusCode;
                if (status == 200 || status == 201) {
                    paymentIntentsObj = JSON.parse(buffer);
                    callback(false, paymentIntentsObj);
                } else {
                    var errorObj = JSON.parse(buffer);
                    callback(res.statusCode, errorObj);
                }
            });

            var decoder = new StringDecoder("utf-8");

        });

        // Bind to the error event so it doesn't get thrown
        req.on('error', function (e) {
            callback(e);
        });

        req.end();

    } else {
        callback('Given parameters were missing or invalid');
    }

};

helpers.sendEmailReceipt = function (text,email, callback) {

    var text = typeof (text) == 'string' && text.trim().length > 0 ? text : false;
    var email = typeof (email) == 'string' && email.trim().length > 0 ? email : false;

    if (text && email ) {

        var payload = {
            "from": 'Mailgun Sandbox <postmaster@sandbox0168c56b92104e5c923d3a9e6aec2d12.mailgun.org>',
            "to": email,
            "subject": "receipt",
            "text":text
        }

        var stringPayload = querystring.stringify(payload);

        //Configure request details
        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.mailgun.net',
            'method': "POST",
            'path': '/v3/sandbox0168c56b92104e5c923d3a9e6aec2d12.mailgun.org/messages',
            'auth': "api:46c81ef70558e3b39bf9e61ed9b488c0-a09d6718-abf8aa93",
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        //Instantiate teh request
        var req = https.request(requestDetails, function (res) {

            var buffer = "";
            res.on("data", function (data) {
                buffer += decoder.write(data);
            });

            res.on("end", function () {
                buffer += decoder.end();
                var status = res.statusCode;
                if (status == 200 || status == 201) {
                    paymentIntentsObj = JSON.parse(buffer);
                    callback(false, paymentIntentsObj);
                } else {
                    var errorObj = JSON.parse(buffer);
                    callback(res.statusCode, errorObj);
                }
            });

            var decoder = new StringDecoder("utf-8");

        });

        // Bind to the error event so it doesn't get thrown
        req.on('error', function (e) {
            callback(e);
        });

        req.write(stringPayload);

        req.end();

    } else {
        callback('Given parameters were missing or invalid');
    }

};



//Get the string content of a template
helpers.getTemplate = function (templateName, data, callback) {
    templateName = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof (data) == 'object' && data !== null ? data : {};

    if (templateName) {
        var templatesDir = path.join(__dirname, '/../templates/');
        fs.readFile(templatesDir + templateName + '.html', 'utf8', function (err, str) {
            if (!err && str.length > 0) {
                // Do interpolation on the string
                var finalString = helpers.interpolate(str, data);
                callback(false, finalString);
            } else {
                callback('No template could be found');
            }
        });
    } else {
        callback("A valida template nma was not specified");
    }
};

// Add the unversal header and footer to a string, and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = function (str, data, callback) {
    str = typeof (str) == 'string' && str.length > 0 ? str : false;
    data = typeof (data) == 'object' && data !== null ? data : {};
    //Get the deader
    helpers.getTemplate('_header', data, function (err, headerString) {
        if (!err && headerString) {
            // Get the footer
            helpers.getTemplate('_footer', data, function (err, footerString) {
                if (!err && footerString) {
                    //Add them all together
                    var fullString = headerString + str + footerString;
                    callback(false, fullString);
                } else {
                    callback("Could not find the footer template");
                }
            });
        } else {
            callback("Could not fin the header template");
        }
    });
};


//Take a given string and a data object an find/reokace all the keys within it
helpers.interpolate = function (str, data) {
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // Add the templateGlobals to the data object, prepending theur key name with "global"
    for (var keyName in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.' + keyName] = config.templateGlobals[keyName];
        }

    }

    //For each key in the data object, insert its value into the string at the correpondig placesholders
    for (var key in data) {
        if (data.hasOwnProperty(key) && typeof (data[key]) == 'string') {
            var replace = data[key];
            var find = '{' + key + '}';
            str = str.replace(find, replace);
        };
    };
    return str;
};


//Get the contents of a static (public) asset
helpers.getStaticAsset = function (fileName, callback) {
    fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;

    if (fileName) {
        var publicDir = path.join(__dirname, '/../public/');
        fs.readFile(publicDir + fileName, function (err, data) {
            if (!err && data) {
                callback(false, data);
            } else {
                callback("No file could be found");
            }
        });
    } else {
        callback("A valid file name was note specified");
    }
};


//export
module.exports = helpers;