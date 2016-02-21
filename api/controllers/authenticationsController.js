// var passport = require('passport');
// var Patient  = require('../models/patient')
// var secret   = require('../config/config').secret
// var jwt      = require('jsonwebtoken');

// function register(request,response, next) {

// 	console.log("this is the request in auth controller " + request)
// 	// request contains two objects
// 	//console.log(request.body.email, request.body.password) // both coming out



// 	//console.log( response) // gives entire server response
// 	// use passport strategy local-signup and add error handling callback
// 	var localStrategy = passport.authenticate('local-signup', function(err, patient, info){
// 		console.log("hello" + " " + patient + " " +info)
// 		// patient is not being passed through
// 		//internal server error 500
// 		console.log(patient + " this is supposed to be the patient")
// 		if(err) return response.status(500).json({message: 'Something went wrong with localStrategy in authentications controller'});
// 		// unauthorized 401
// 		if(info) return response.status(401).json({ message: info.message});
// 		// unauthroized 401
// 		if(!patient) return response.status(401).json({ message: 'User already exists!'});
// 		// if no errors
// 		console.log("user is authenticated, time to assign token")
// 		// one day expiry date, sign to patient using secret stored in config
// 		var token = jwt.sign(patient, secret, {expiresIn: 60*60*24})
// 		// once token made successfully redirect user to signedin page
// 		// pass token with them and patient variable for use
// 		return response.render('index', {token: token, patient: patient})
// 	});

// 	// is hitting here first and then passport.js in config and then localStrategy
// 	//console.log(request.body + " hello this is the request in authenticationsController register")
// 	//console.log(response + " this is the response in authenticationsController register")
// 	// getting internal server error
// 	// how can you intialise the database?

// 	return localStrategy(request, response, next);
// };

// function login(request, response, next){
// 	// mongoose query on emergency services database for patient document in patients collection
// 	Patient.findOne({
// 		"email": request.body.email
// 	}, function(err, patient){
// 		// ERROR HANDLING
// 		// internal server error
// 		if(err) return response.status(500).json(err);
// 		// no patient with these details
// 		if(!patient) return response.status(403).json({ message: 'No user found'});
// 		//wrong password
// 		if(!patient.validPassword(request.body.password)) return response.status(403).json({ message: 'Authentication failed. Please retype your password'})

// 		// if no errors
// 		var token = jwt.sign(patient, secret, {expiresIn: 60*60*24});

// 		// why are you not rendering a page here?
// 		return response.status(200).json({
// 			success: true,
// 			message: 'hello again',
// 			token: token
// 		});
// 	});
// };

// module.exports ={
// 	login: login,
// 	register: register
// }

var passport = require("passport");
var User     = require('../models/user');
var secret   = require('../config/config').secret 
var jwt      = require('jsonwebtoken');

function register(req, res, next) {

  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong with localStrategy in authentications controller!' });
    if (info) return res.status(401).json({ message: info.message });
    if (!user) return res.status(401).json({ message: 'User already exists!' });
    console.log("authenticated")
    // User has authenticated so issue token 
    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });
    
    // Send back the token to the front-end to store
    return res.status(200).json({ 
      success: true,
      message: "Thank you for authenticating",
      token: token,
      user: user
    });

    return res.render('index', { token: token, user: user });

  });

  console.log(req.body)

  return localStrategy(req, res, next);
};


function login(req, res, next) {
  console.log("hey man im trying to login here")
  User.findOne({
    "email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'No user found.' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(user, secret, { expiresIn: 10440 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token
    });
  });
};

module.exports = {
  login: login,
  register: register
}