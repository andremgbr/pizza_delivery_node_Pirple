/*
 * CLI - RElated Taks
 * 
 */

//Dependencies

var readLine = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
const { type } = require('os');
class _events extends events{ };
var e = new _events();
var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var helpers = require('./helpers');

//Instantiate the CLI module object
var cli = {};


// Inout handlers
e.on('man', function (str) {
    cli.responders.help();
});

e.on('help', function (str) {
    cli.responders.help();
});

e.on('exit', function (str) {
    cli.responders.exit();
});
e.on('stats', function (str) {
    cli.responders.stats();
});
e.on('list users', function (str) {
    cli.responders.listUsers();
});
e.on('more user info', function (str) {
    cli.responders.moreUserInfo(str);
});
e.on('list menu', function (str) {
    cli.responders.listMenu();
});
e.on('more menu info', function (str) {
    cli.responders.moreMenuinfo(str);
});
e.on('list orders', function (str) {
    cli.responders.listorders();
});
e.on('more order info', function (str) {
    cli.responders.moreOrderInfo(str);
});






// Responders object
cli.responders = {};

// Help / Man
cli.responders.help = function () {
    var commands = {
        'exit':'Kill the CLI (and the rest of the application)',
        'man': 'Show this help page',
        'help': 'Alias of the "man" command',
        'stats' : 'Get statistics on the unreling opreting system and resource utilization',
        'list users ': ' View all the users who have signed up in the last 24 hours',
        'more user info --{ userId }' : 'Show details of a specific user',
        'list menu': 'Show the Menu List ',
        'more menu info --{menuId}': 'Show details of a menu',
        'list orders': 'Show a list of all the order in the last 24 hours',
        'more order info --{orderId}': 'Show details of a order file',
    };
    // Show a header for the help page that is as wide as the screen
    cli.horizontaLine();
    cli.centered('CLI MANUAL');
    cli.horizontaLine();
    cli.verticalSpace(2);

    //Show each command, followed by its explanation, in the white and yellow respectively
    for (var key in commands) {
        if (commands.hasOwnProperty(key)) {
            var value = commands[key];
            var line = '\x1b[33m' + key + '\x1b[0m';
            var padding = 60 - line.length;
            for (i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line)
            cli.verticalSpace()
        }
    }

    cli.verticalSpace(1);

    //End with anoter horizontalLine
    cli.horizontaLine();

};


//Create a vertical space
cli.verticalSpace = function (line) {
    lines = typeof (lines) == 'number' && lines > 0 ? lines : 1;
    for (i = 0; i < lines; i++) {
        console.log('');
    }
};

//Create a horizontal line acroos the scrre
cli.horizontaLine = function () {
    // Get the avaiable screen size
    var width = process.stdout.columns;
    var line = '';
    for (i = 0; i < width; i++) {
        line += '-';
    }
    console.log(line);

};


//Create centerd tex on the screen
cli.centered = function (str) {
    str = typeof (str) == 'string' && str.length > 0 ? str.trim() : '';
    // Get the avaiable screen size
    var width = process.stdout.columns;

    //Calculate the lef paddin there should be
    var leftPadding = Math.floor((width - str.length) / 2);

    //Put in left padded space before the string itself
    var line = '';
    for (i = 0; i < leftPadding;i++) {
        line += ' ';
    }
    line += str;
    console.log(line);
}


//Exit
cli.responders.exit = function () {
    process.exit(0);
};

//Stats
cli.responders.stats = function () {
    //Compile an object of stats
    var stats = {
        'Load Average': os.loadavg().join(' '),
        'CPU Count': os.cpus().length,
        'Free Memory': os.freemem(),
        'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Userd (%)': Math.round(v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size * 100),
        'Available Heap Allocated (%)': Math.round(v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit * 100),
        'Uptime':os.uptime()+' Seconds'
    };

    // Create a header for the stats
    cli.horizontaLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontaLine();
    cli.verticalSpace(2);

    //Log out each stat
    for (var key in stats) {
        if (stats.hasOwnProperty(key)) {
            var value = stats[key];
            var line = '\x1b[33m' + key + '\x1b[0m';
            var padding = 60 - line.length;
            for (i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line)
            cli.verticalSpace()
        }
    }
};

//List users
cli.responders.listUsers = function () {
    _data.list('users', function (err, userIds) {
        if (!err && userIds.length > 0) {
            cli.verticalSpace();
            userIds.forEach(function (userId) {
                _data.read('users', userId, function (err, userData) {
                    if (!err && userData) {
                        _data.list('tokens', function (err, tokenId) {
                            if (!err && tokenId) {
                                _data.read('tokens', tokenId, function (err,tokenData) {
                                    if (!err && tokenData) {
                                        if (tokenData.phone == userData.phone && tokenData.expires >= Date.now()) {

                                            var horas = ((Date.now() - (tokenData.expires - (1000 * 60 * 60 * 24))) /(1000 * 60 * 60));
                                            var line = 'Name: ' + userData.firstName + ' ' + userData.lastName + ' Phone and ID: ' + userData.phone + '  Logged at: ' + horas.toFixed(1) +' hours ago' ;
                                            console.log(line);
                                            cli.verticalSpace;
                                        }
                                    }
                                });

                            }
                        });
                    }
                });
            });
        }
    });
};

//more user info
cli.responders.moreUserInfo = function (str) {
    //Get the ID from string
    var arr = str.split('--');
    var userId = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (userId) {
        //Lookup the user
        _data.read('users', userId, function (err, userData) {
            if (!err && userData) {
                //Remove the hased password
                delete userData.password;

                //Print the JSON with tet highlighting
                cli.verticalSpace();
                console.dir(userData, { 'colors': true });
                cli.verticalSpace();

            }

        });
    }
};


//List menu
cli.responders.listMenu = function (str) {
    _data.list('itens', function (err, itenIds) {
        if (!err && itenIds && itenIds.length > 0) {
            cli.verticalSpace();
            itenIds.forEach(function (itenId) {
                _data.read('itens', itenId, function (err, itenData) {
                   
                    var line = "ID " + itenData.id + ' - Name: ' + itenData.name+ ' - Price: ' + itenData.price;
                    console.log(line);
                    cli.verticalSpace();

                });
            });
        };
    });
};

//more menu info
cli.responders.moreMenuinfo = function (str) {
    //Get the ID from string
    var arr = str.split('--');
    var checkId = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (checkId) {
        //Lookup the user
        _data.read('itens', checkId, function (err, itenData) {
            if (!err && itenData) {

                //Print the JSON with tet highlighting
                cli.verticalSpace();
                console.dir(itenData, { 'colors': true });
                cli.verticalSpace();

            }

        });
    }
};

//List logs
cli.responders.listorders = function () {
    _data.list('orders', function (err, ordersId) {
        if (!err && ordersId && ordersId.length > 0) {
            cli.verticalSpace();
            ordersId.forEach(function (oderId) {
                _data.read('orders', oderId, function (err, oderData) {
                    if (!err && oderData) {

                        if (oderData.id*1000*60*60*24 >= Date.now()) {

                            var horas = ((Date.now() - (oderData.id )) / (1000 * 60 * 60));
                            var line = 'Id: ' + oderData.id + ' created at : ' + horas.toFixed(1) + ' hours ago';
                            console.log(line);
                            cli.verticalSpace;
                        }
                    }
                });
            });
        }
    });
};

//More oder info
cli.responders.moreOrderInfo = function (str) {
    //Get the ID from string
    var arr = str.split('--');
    var checkId = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (checkId) {
        //Lookup the user
        _data.read('orders', checkId, function (err, oderData) {
            if (!err && oderData) {

                //Print the JSON with tet highlighting
                cli.verticalSpace();
                console.dir(oderData, { 'colors': true });
                cli.verticalSpace();

            }

        });
    }
};






//Input processor
cli.processInput = function (str) {
    str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : false;

    // Only process the unput if the user actuallu wrote somethon. otherwise ignore
    if (str) {
        // Codify the unique string that identify the unique questions allowed to be asked
        var uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list menu',
            'more menu info',
            'list orders',
            'more order info'

        ];

        // Go through the possoble inputs, emit an event when a math is found
        var matchFound = false;
        var counter = 0;
        uniqueInputs.some(function (input) {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                //emi an event matching the unique input, and include the full string given by the user

                e.emit(input, str);
                return true;
            }
        });

        // If no math is found, tell the user to try again
        if (!matchFound) {
            console.log("Sorry, try again");
        }
    }

};



//Init script
cli.init = function () {
    // Send the start message to the console, in dark blue
    console.log('\x1b[34m%s\x1b[0m', "The CLI is running");

    //Start the interface
    var _interface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    //Create an intitial prompt
    _interface.prompt();

    //Handle each line of input separetely.
    _interface.on('line', function (str) {
        // Send to the input processor
        cli.processInput(str);

        // Re-initialize the prompt afterward
        _interface.prompt();

    });

    //If the user stop the CLI, Kill the associated process
    _interface.on('close', function(){
        process.exit(0);
    });


};




//Export the module
module.exports = cli;