/*
 * 
 * API of PIZZA DELIVERY 
 *
 */

//Dependecies
var http = require('http');
var url = require('url');
const { StringDecoder }= require('string_decoder');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');
var cli = require('./lib/cli')

//Instantiate the Http Server and Server logic
var httpServer = http.createServer(function (req, res) {
    
    //Get the URL and pharse it
    var parseUrl = url.parse(req.url, true);

    //Get the path
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the query string as an object;
    var queryStringObject = parseUrl.query;

    //Get the HTTP Method
    var method = req.method.toLowerCase();

    //Get the headers as an object
    var headers = req.headers;

    //Get the payload
    var decoder = new StringDecoder("utf-8");
    var buffer = "";

    req.on("data", function (data) {
        buffer += decoder.write(data);
    });

    req.on("end", function () {
        buffer += decoder.end();


        //Choose the handler 
        var chosenHandler = typeof (routers[trimmedPath]) !== "undefined" ? routers[trimmedPath] : handlers.notFound;

        //If the request is within the public directoru, use the public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;


        var data = {
            "trimmedPath": trimmedPath,
            "queryStringObject": queryStringObject,
            "method": method,
            "headers": headers,
            "payload": helpers.parseJsonToObject(buffer)

        };

        chosenHandler(data, function (statusCode, payload,contentType) {


            //Determine the type of response (fallback to JSON)
            contentType = typeof (contentType) == 'string' ? contentType : 'json';


            //Use the statusCode called by the handler, or defaut 200..
            statusCode = typeof (statusCode) == "number" ? statusCode : 200;

            //return the response parts that are content-specific
            var payloadSting = '';
            if (contentType == 'json') {
                res.setHeader("Content-Type", "application/json");

                // Use the payload called back by handler, or default to an empty object
                payload = typeof (payload) == "object" ? payload : {};

                //Convert the payload to a string
                var payloadString = JSON.stringify(payload);

            };

            if (contentType == 'html') {
                res.setHeader("Content-Type", "text/html");
                payloadString = typeof (payload) == "string" ? payload : '';
            };

            if (contentType == 'favicon') {
                res.setHeader("Content-Type", "image/x-icon");
                payloadString = typeof (payload) !== "undefined" ? payload : '';
            };

            if (contentType == 'css') {
                res.setHeader("Content-Type", "text/css");
                payloadString = typeof (payload) !== "undefined" ? payload : '';
            };

            if (contentType == 'png') {
                res.setHeader("Content-Type", "image/png");
                payloadString = typeof (payload) !== "undefined" ? payload : '';
            };

            if (contentType == 'jpg') {
                res.setHeader("Content-Type", "image/jpeg");
                payloadString = typeof (payload) !== "undefined" ? payload : '';
            };

            if (contentType == 'plain') {
                res.setHeader("Content-Type", "text/plain");
                payloadString = typeof (payload) !== "undefined" ? payload : '';
            };




            //Return the response-parts that are commonto all content-tyoes
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log(statusCode);
        });
    });

});

httpServer.listen(5000, function () {
    console.log("Server listening on port:5000");
});


//Start the CLI, but make sure ut start last
setTimeout(function () {
    cli.init();
}, 50);


//Define a request router
routers = {
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'checks/all': handlers.itensList,
    'orderPlaced': handlers.orderPlaced,
    "api/itens": handlers.itens,
    "api/users": handlers.users,
    "api/tokens": handlers.tokens,
    "api/menu": handlers.menu,
    'favicon.ico': handlers.favicon,
    'public': handlers.public
};

