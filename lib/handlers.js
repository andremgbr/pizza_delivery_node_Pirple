/*
 * 
 * Handlers for API
 */

const { type } = require("os");
const { PassThrough } = require("stream");
const { list } = require("./data");

//Dependecies
var _data = require('./data');
var helpers = require('./helpers');


//Instanciate the handlers
handlers = {};


/*
 * 
 * HTML Handlres
 * 
 */

//Index handler
handlers.index = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "Delivery Pizza",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'index',
		}


		//Read in a template as a string
		helpers.getTemplate('index', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};


//Create Account handler
handlers.accountCreate = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "Create a Account",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'accountCreate',
		}


		//Read in a template as a string
		helpers.getTemplate('accountCreate', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};


//Session Create  handler
handlers.sessionCreate = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "session Create",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'sessionCreate',
		}


		//Read in a template as a string
		helpers.getTemplate('sessionCreate', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};

//Session Delete  handler
handlers.sessionDeleted = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "session Deleted",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'sessionDeleted',
		}


		//Read in a template as a string
		helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};

//Account Edit  handler
handlers.accountEdit = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "Account Edit",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'accountEdit',
		}


		//Read in a template as a string
		helpers.getTemplate('accountEdit', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};


//List of Itens
handlers.itensList = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "List of Itens",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'itensList',
		}


		//Read in a template as a string
		helpers.getTemplate('itensList', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};


//Sucess order
handlers.orderPlaced = function (data, callback) {
	//Reject any reqyest tgat usn't a GET
	if (data.method == 'get') {

		//Prepare data for interpolation
		var templateData = {
			'head.title': "Succesful order",
			'head.description': 'Delivery Pizza Services',
			'body.class': 'orderPlaced',
		}


		//Read in a template as a string
		helpers.getTemplate('orderPlaced', templateData, function (err, str) {
			if (!err && str) {
				// Add the universal headers and footer
				helpers.addUniversalTemplates(str, templateData, function (err, str) {
					if (!err && str) {
						callback(200, str, 'html');
					} else {
						callback(500, undefined, 'html');
					}

				});
			} else {
				callback(500, undefined, 'html');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}

};

// Favicon
handlers.favicon = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Read in the favicon's data
		helpers.getStaticAsset('favicon.ico', function (err, data) {
			if (!err && data) {
				//callback the data
				callback(200, data, 'favicon');
			} else {
				callback(500);
			}
		});
	} else {
		callback(405);
	}
};

//Pubilc assets
handlers.public = function (data, callback) {
	// Reject any request that isn't a GET
	if (data.method == 'get') {
		// Get the filename being requested
		var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
		if (trimmedAssetName.length > 0) {
			//Read in the asset's data
			
			helpers.getStaticAsset(trimmedAssetName, function (err, data) {
				if (!err && data) {
					//Determine the content type (default to plain text)
					var contentType = 'plain';
					if (trimmedAssetName.indexOf('.css') > -1) {
						contentType = 'css';
					}
					if (trimmedAssetName.indexOf('.png') > -1) {
						contentType = 'png';
					}
					if (trimmedAssetName.indexOf('.jpg') > -1) {
						contentType = 'jpg';
					}
					if (trimmedAssetName.indexOf('.ico') > -1) {
						contentType = 'favicon';
					}

					//callbacl the data
					callback(200, data, contentType);
				} else {
					callback(500);
				}
			});
		} else {
			callback(404);
		}

	} else {
		callback(405);
	}
};


/*
 *
 * JSON API Handlers
 *
 */



handlers.users = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._users[data.method](data,callback);
	} else {
		callback(405);
	}
}
//Container fot the user submethods
handlers._users = {};


//Users - post
//Required data: FirstName, LastName, Phone, Street, Password, email ,tosAgreement
//Optional data:none
handlers._users.post = function (data, callback) {
	//Check all the require field are filled
	firstName = typeof (data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
	lastName = typeof (data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
	phone = typeof (data.payload.phone) == "string" && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
	street = typeof (data.payload.street) == "string" && data.payload.street.trim().length > 0 ? data.payload.street.trim() : false;
	password = typeof (data.payload.password) == "string" && data.payload.password.trim().length > 6 ? data.payload.password.trim() : false;
	email = typeof (data.payload.email) == "string" && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
	tosAgreement = typeof (data.payload.tosAgreement) == "boolean" && data.payload.tosAgreement == true ? true : false;


	if (firstName && lastName && phone && street && password && tosAgreement && email) {
		//Make sure that user doesn't already exist


		_data.read('users', phone, (err, data) => {
			if (err) {
				//Creat the user object
				var userObject = {
					'firstName': firstName,
					'lastName': lastName,
					'phone': phone,
					'street': street,
					'password': password,
					'tosAgreement': tosAgreement,
					'email': email
				};

				//Store the user
				_data.create('users', phone, userObject, err => {
					if (!err) {
						callback(200);
					} else {
						console.log(err);
						callback(500, { "Error": "Could not creat the new user" });
					}
				});

			} else {
				callback(400, { 'Error': "A user with that phone number already exist" });
			}
		});


	} else {
		callback(400, { "Error": "There's field missing or not correct filled." });
	}
};


//Users - get
//Required data: phone
//Optional data:none
handlers._users.get = function (data, callback) {
	//Check that number is valid
	var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;


	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;


	handlers._tokens.verifyToken(token, phone, isValid => {
		if (isValid) {

			if (phone) {
				_data.read('users', phone, (err, userData) => {
					if (!err && userData) {
						callback(200, userData);
					} else {
						callback(404)
					}
				});
			} else {
				callback(400, { "Error": "Missing required field" });
					}
		} else {
			callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
		}
	});
};


//Users - Update
//Require field - phone
//Optional - FirstName, LastName, Street, Password, email
handlers._users.put = function (data, callback) {
	//Check the phone
	firstName = typeof (data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
	lastName = typeof (data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
	phone = typeof (data.payload.phone) == "string" && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
	street = typeof (data.payload.street) == "string" && data.payload.street.trim().length > 0 ? data.payload.street.trim() : false;
	password = typeof (data.payload.password) == "string" && data.payload.password.trim().length > 6 ? data.payload.password.trim() : false;
	email = typeof (data.payload.email) == "string" && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;


	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;


	//Error if the phone is invalid
	if (phone) {
		if (firstName || lastName || street || password || email) {

			handlers._tokens.verifyToken(token, phone, isValid => {
				if (isValid) {
					//Lookup the user
					_data.read('users', phone, (err, userData) => {
						if (!err && userData) {
							//Update the fields necessary
							if (firstName) {
								userData.firstName = firstName;
							};
							if (lastName) {
								userData.lastName = lastName;
							};
							if (street) {
								userData.street = street;
							};
							if (password) {
								userData.password = password;
							};
							if (email) {
								userData.email = email;
							};

							//Store the data
							_data.update('users', phone, userData, err => {
								if (!err) {
									callback(200);
								} else {
									console.log(err);
									callback(500, { "Error": "Could not update the user" });
								};
							});


						} else {
							callback(400, { 'Erro': 'The specified user does not exist' });
						};
					});
				} else {
					callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
				};
			});
		} else {
			callback(400, { "Error": "Missing required field" })
		}

	} else {
		callback(400, { "Error": "Missing required field" })

	};
};


//Users - delete
//Require field - phone
handlers._users.delete = function (data, callback) {

	//Check the phone is valid
	var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

	if (phone) {
		_data.read('users', phone, (err, userData) => {
			if (!err && userData) {
				_data.delete('users', phone, err => {
					if (!err) {
						callback(200, { "Success": "The user (" + phone + ") has been deleted." });
					} else {
						callback(500, { "Error": "Could not delete the specified user" });
					}
				});
			} else {
				callback(404, {"Error":"User not found"});
            }

		});
	} else {
		callback(400, { "Error": "Missing required field" });
    }


};



handlers.tokens = function (data, callback) {
	var acceptableMethods = ['post','delete'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._tokens[data.method](data, callback);
	} else {
		callback(405);
	}
}
//Container fot the user submethods
handlers._tokens = {};

//Tokens - post
//Required data: phone, password
//Optional data: nome
handlers._tokens.post = function (data, callback) {
	var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length >= 10 ? data.payload.phone.trim() : false;
	var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
	if (phone && password) {
		//Lookup the user who matches that phone number
		_data.read('users', phone, function (err, userData) {
			if (!err && userData) {
				//Hash the sent password, and compare it to the password stored in the user object
				//var hashedPassword = helpers.hash(password);
				if (password == userData.password) {
					// if valid, creat a new token with a radom name. Set expiratin date 1 hour in the future
					var tokenId = helpers.createRandomString(20);
					var expires = Date.now() + 1000 * 60 * 60 * 24;
					var tokenObject = {
						'phone': phone,
						'id': tokenId,
						'expires': expires
					};

					// Store the token
					_data.create('tokens', tokenId, tokenObject, function (err) {
						if (!err) {
							callback(200, tokenObject);
						} else {
							callback(400, { 'erro': "Could not creat the new toekn" });
						}
					});

				} else {
					callback(400, { "Error": "Password did not match the specified user\'s stored password" });
				}
			} else {
				callback(400, { 'Error': "Could not find the specified user" });
			}
		});
	} else {
		callback(400, { 'Error': "Missing required field(s)" });
	}
};


//Tokens - delete
//Require data: id
//Optional data: none
handlers._tokens.delete = function (data, callback) {
	//check the id is valid
	var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
	if (id) {
		//Lookuo the token
		_data.read('tokens', id, function (err, data) {
			if (!err && data) {
				_data.delete('tokens', id, function (err) {
					if (!err) {
						callback(200);
					} else {
						callback(500, { "Error": "Could not delete the specified token" });
					}
				});
			} else {
				callback(400, { "ERROR": "Could not find the specified token" });
			}
		});
	} else {
		callback(400, { 'Error': 'Missing required field' });
	}
};

//Verif if a given token id is currently valid for a ginven user
handlers._tokens.verifyToken = function (id, phone, callback) {
	//LockUp the token
	_data.read('tokens', id, function (err, tokenData) {
		if (!err && tokenData) {
			//Check thath the token is for the user and has not expired
			if (tokenData.phone == phone && tokenData.expires > Date.now()) {
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
	});

};



handlers.itens = function (data, callback) {
	var acceptableMethods = ['post','put','get', 'delete'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._itens[data.method](data, callback);
	} else {
		callback(405);
	}
}
//Container fot the user submethods
handlers._itens = {};

//itens - post
//Required data: id,name,price,ingredientes
//Optional data:none
handlers._itens.post = function (data, callback) {
	//Check all the require field are filled
	id = typeof (data.payload.id) == "string" && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;
	name = typeof (data.payload.name) == "string" && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
	price = typeof (data.payload.price) == "string" && data.payload.price.trim().length > 0 ? data.payload.price.trim() : false;
	ingredientes = typeof (data.payload.ingredientes) == "string" && data.payload.ingredientes.trim().length > 0 ? data.payload.ingredientes.trim() : false;
	

	if (id&& name&& price&& ingredientes) {
		//Make sure that user doesn't already exist
		_data.read('itens', id, (err, data) => {
			if (err) {
				//Creat the user object
				var menuObject = {
					'id': id,
					'name': name,
					'price': price,
					'ingredientes': ingredientes
				};

				//Store the user
				_data.create('itens', id, menuObject, err => {
					if (!err) {
						callback(200);
					} else {
						console.log(err);
						callback(500, { "Error": "Could not creat the new menu" });
					}
				});

			} else {
				callback(400, { 'Error': "A menu with that ID number already exist" });
			}
		});


	} else {
		callback(400, { "Error": "There's field missing or not correct filled." });
	}
};


//itens - get
//Required data: id && phone(user)
//Optional data:none
handlers._itens.get = function (data, callback) {
	//Check that id is valid
	var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;


	//Check that number is valid (user ID)
	var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;


	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;


	if (id && phone) {
		handlers._tokens.verifyToken(token, phone, isValid => {
			if (isValid) {

				_data.read('itens', id, (err, userData) => {
					if (!err && userData) {
						callback(200, userData);
					} else {
						callback(404)
					}
				});
			} else {
				callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
			}
		});
	} else {
		callback(400, { "Error": "Missing required field" });
	};
};


//itens - Update
//Require field - ID && phone
//Optional - name,price,ingredientes
handlers._itens.put = function (data, callback) {
	//Check all the require field are filled
	id = typeof (data.payload.id) == "string" && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;
	name = typeof (data.payload.name) == "string" && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
	price = typeof (data.payload.price) == "string" && data.payload.price.trim().length > 0 ? data.payload.price.trim() : false;
	ingredientes = typeof (data.payload.ingredientes) == "string" && data.payload.ingredientes.trim().length > 0 ? data.payload.ingredientes.trim() : false;


	//Check that number is valid (user ID)
	var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;


	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;


	//Error if the phone is invalid
	if (id) {
		if ( name || price || ingredientes) {

			handlers._tokens.verifyToken(token, phone, isValid => {
				if (isValid) {
					//Lookup the itens
					_data.read('itens', id, (err, itensData) => {
						if (!err && itensData) {
							//Update the fields necessary
							if (name) {
								itensData.name = name;
							};
							if (price) {
								itensData.price = price;
							};
							if (ingredientes) {
								itensData.ingredientes = ingredientes;
							};

							//Store the data
							_data.update('itens', id, itensData, err => {
								if (!err) {
									callback(200);
								} else {
									console.log(err);
									callback(500, { "Error": "Could not update the menu" });
								};
							});


						} else {
							callback(400, { 'Erro': 'The specified menu does not exist' });
						};
					});
				} else {
					callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
				};
			});
		} else {
			callback(400, { "Error": "Missing required field" })
		}

	} else {
		callback(400, { "Error": "Missing required field" })

	};
};


//itens - delete
//Require field - id && phone(user)
handlers._itens.delete = function (data, callback) {

	//Check the id is valid
	var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;

	//Check that number is valid (user ID)
	var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;


	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;


	if (id) {
		handlers._tokens.verifyToken(token, phone, isValid => {
			if (isValid) {
				_data.read('itens', id, (err, itensData) => {
					if (!err && itensData) {
						_data.delete('itens', id, err => {
							if (!err) {
								callback(200, { "Success": "The menu (" + itensData.name + ") has been deleted." });
							} else {
								callback(500, { "Error": "Could not delete the specified menu" });
							}
						});
					} else {
						callback(404, { "Error": "Menu not found" });
					}

				});
			} else {
				callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
            }
		});
		
	} else {
		callback(400, { "Error": "Missing required field" });
	}


};



handlers.menu = function (data, callback) {
	var acceptableMethods = ['get','post'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._menu[data.method](data, callback);
	} else {
		callback(405);
	}
}

//Container fot the user submethods
handlers._menu = {};

//Menu - get
//Required data: phone(user)
//Optional data:none
handlers._menu.get = function (data, callback) {

	//Check that number is valid (user ID)
	var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;

	
	if (phone && token) {
		handlers._tokens.verifyToken(token, phone, isValid => {
			if (isValid) {
				_data.list('itens', (err, itensData) => {
					if (!err && itensData) {
						var listItens = {};
						var itemsProcessed = 0;
						itensData.forEach(function (id, index,array){
							_data.read('itens', id, (err, itData) => {
								if (!err && itData) {
									listItens[id] = itData.name;
									itemsProcessed++;
									if (itemsProcessed == array.length) {
										callback(200, listItens);
                                    }
								} else {
									console.log("Error to get " + itData + " item");
								}
							});
						});
					} else {
						callback(404)
					}
				});
			} else {
				callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
			}
		});
	} else {
		callback(400, { "Error": "Missing required field" });
	};
};



//menu - post
//Required data: arrray id, payment card number.
//Optional data:none
handlers._menu.post = function (data, callback) {

	//Check all the require field are filled
	idArray = typeof (data.payload.idArray) == "string" && data.payload.idArray.trim().length ? data.payload.idArray : false;
	cardNumber = typeof (data.payload.cardNumber) == "string" && data.payload.cardNumber.trim().length > 0 ? data.payload.cardNumber.trim() : false;
	cardExp_month = typeof (data.payload.cardExp_month) == "string" && data.payload.cardExp_month.trim().length > 0 && data.payload.cardExp_month.trim().length <= 2 ? data.payload.cardExp_month.trim() : false;
	cardExp_year = typeof (data.payload.cardExp_year) == "string" && data.payload.cardExp_year.trim().length == 4 ? data.payload.cardExp_year.trim() : false;
	cardCvc = typeof (data.payload.cardCvc) == "string" && data.payload.cardCvc.trim().length == 3 ? data.payload.cardCvc.trim() : false;


	//Check that number is valid ( user ID)
	var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

	//Get the token
	token = typeof (data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token : false;

	if (idArray && cardNumber && phone && token && cardExp_month && cardExp_year && cardCvc) {
		idArray = idArray.split(",");
		handlers._tokens.verifyToken(token, phone, isValid => {
			if (isValid) {

				var totalPrice = 0;
				var itemsProcessed = 0;
				idArray.forEach(function (iten,index,array) {
					_data.read("itens", iten, function (err, data) {
						if (!err && data) {
							totalPrice += parseInt(data.price*100);
							itemsProcessed++;
							if (itemsProcessed == array.length) {

								var card = {

									"type" : 'card',
									"card[number]": cardNumber,
									"card[exp_month]": cardExp_month,
									"card[exp_year]": cardExp_year,
									"card[cvc]": cardCvc

								};

								helpers.postStripPaymentMethod(card, function (err,res) {

									if (!err) {
										var paymentMethodObj = res;

										var order = {
											"payment_method": paymentMethodObj.id,
											"currency": "usd",
											"amount": (totalPrice)
										};

										helpers.postStripPayment_intents(order, function (err, res) {
											if (!err) {
												var paymentIntentsObj = res;
												helpers.postStripPayment_instentsConfirm(paymentIntentsObj.id, function (err, res){
													if (!err) {
														var paymentConfirmObj = res;
														_data.read('users', phone, function (err, dataUser) {
															if (!err) {
																var text = "Your payment is done. You can see your receipt here: " + paymentConfirmObj.charges.data[0].receipt_url;
																console.log(dataUser.email);
																helpers.sendEmailReceipt(text, dataUser.email, function (err, res) {
																	if (!err) {
																		var orderData = {
																			'id': Date.now(),
																			'userObject': dataUser,
																			'ordersIds': idArray,
																			'totalPrice': totalPrice,
																			'urlReceipt': paymentConfirmObj.charges.data[0].receipt_url
																		};
																		_data.create('orders', orderData.id, orderData, function (err) {
																			if (!err) {

																				callback(200, {
																					"Success": "Receipt sent to: " + dataUser.email,
																					"urlReceipt": paymentConfirmObj.charges.data[0].receipt_url
																				});
																			} else {
																				callback(200, { "Error": 'creating a log order' });
																			}
																		});
																	} else {
																		callback(400, res);
                                                                    }

																});
															} else {
																callback(404)
                                                            }
														});
													} else {
														callback(err, res);
                                                    }
												});
											} else {
												callback(err,res)
											}
										});
									} else {
										callback(err,res);
                                    }
								});
                            }

						} else {
							console.log("Error ao ler uma data");
							callback(404, {"Error":"Number Id not found"});
                        }
					});
				});


			} else {
				callback(403, { "Error": "Missing required token is the headers, or token is invalid" });
			}
		});
	} else {
		callback(400, { "Error": "There's field missing or not correct filled." });
	}
};


handlers.notFound = function (data, callback) {
    callback(404);
}

//export
module.exports = handlers;