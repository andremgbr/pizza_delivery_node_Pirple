/*
 * 
 * Lib for storing and editing data
 * 
 */

//dependecies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');


//Container for the module
var lib = {};


//Base directory for the data folder
lib.baseDir = path.join(__dirname, "/../.data/");

//Write data to a file
lib.create = function (dir, file, data, callback) {
    //Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {

            //Convert data to string
            var stringData = JSON.stringify(data);

            //write to file and close it
            fs.writeFile(fileDescriptor, stringData, err => {
                if (!err) {
                    fs.close(fileDescriptor, err => {
                        if (!err) {
                            callback(false);
                        } else {
                            callback("Error colsing new file");
                        }
                    });
                } else {
                    callback("Error writing to new file");
                }
            });
        } else {
            callback("Could not creat new file, it may alredy exist");
        }
    });
};


//Read data from a file
lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf-8", (err, data) => {
        if (!err && data) {
            dataParsed = helpers.parseJsonToObject(data);
            callback(false, dataParsed);
        } else {
            console.log(err);
            callback(err, data);
        }

    });
};


//Update data inside a file
lib.update = function (dir, file, data, callback) {
    // OPen the file for writhing
    fs.open(lib.baseDir + dir + "/" + file + ".json", "r+", function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);

            //Truncate the file
            fs.ftruncate(fileDescriptor, function (err) {
                if (!err) {
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback("error closing the File")
                                }
                            });
                        } else {
                            callback("error to write the file")
                        }
                    });

                } else {
                    callback("Error truncating file");
                }
            });
        } else {
            callback("Could not opten the file for updating, it may not exist yet");
        }
    });
};


// Delete a file
lib.delete = function (dir, file, callback) {
    //Unlink the file
    fs.unlink(lib.baseDir + dir + '/' + file + ".json", err => {
        if (!err) {
            callback(false);
        } else {
            callback("Error deleting file");
        }
    });
};

//List all the items in a directory
lib.list = function (dir, callback) {
    fs.readdir(lib.baseDir + dir + '/', function (err, data) {
        if (!err && data.length > 0) {
            var trimmedFileNames = [];
            data.forEach(function (fileName) {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);
        } else {
            callback(err, data);
        }
    });
};



//Export
module.exports = lib;