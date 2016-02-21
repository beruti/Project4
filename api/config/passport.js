// var LocalStrategy = require('passport-local').Strategy;
// var Patient          = require('../models/patient');

// module.exports = function(passport){

// 	passport.use('local-signup', new LocalStrategy({
// 		// taken from model
// 		// is a structured method
// 		// can use anything from model but it will be taken as the usernamefield here in order to complete strategy 
// 		usernameField: "email",
// 		passwordField: "password",
// 		// give this request to callback function below
// 		passReqToCallBack: true
// 	}, function(req, email, password, done){
// 		console.log('**************')
// 		//		console.log("this is the req "+ req)
// 		// req is coming out as email and email is coming out as password
// 		// so what is passing this info through??
// 		// -- should be in request on server with 


// 		//// password is coming out as done function
// 		//console.log("this is the email of the patient " + email, " this is their password "+password)
// 		// find a user with this email
// 		// what is {email : email} doing? bringing variable from where
// 		User.findOne({ email: email}, function(err, patient){
// 			// ERROR HANDLE
// 			// user not found so should be ok to sign-up but something went wrong
// 			// as a result error is triggered and sign up will have to be reattempted
// 			console.log("looking for a patient..." + patient)
// 			if (err) return done(err, false, {message: "Something went wrong with passport strategy in passport.js"})

// 			// No error but a user with those details is pre-existing
// 			if (user) return done(null, false, {message: "Please choose another email address, this one is taken"});
// 			// check email and password are present
// 			console.log(email + " " + password)
// 			console.log(usernameField);
// 			console.log(passwordField);
// 			// instantiate new Patient object with patient schema
// 			var newPatient = new Patient();
// 			// populate Patient object
// 			newPatient.email = email;
// 			//check patient has been given the email
// 			console.log(newPatient.email)
// 			// give password
// 			newPatient.password = Patient.encrypt(password);
// 			console.log(newPatient.password)

// 			//if patient has been succesfully created with email and password
// 			// save to database

// 			newPatient.save(function(err, newPatient){
// 			//error handler if save fails
// 			if(err) return done(err, false, { message: "Failure to save new patient"})
// 			//new patient created
// 			return done(null, newPatient)
// 			console.log(newPatient)	
// 			});
// 		})
// 	}))
// }

// This is empty and needs filling - Caroline
var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done) {
  	console.log("*******************************************")

    // Find a user with this email
    User.findOne({ email : email }, function(err, user) {
      console.log("looking for a user........." + user)
      if (err) return done(err, false, { message: "Something went wrong with passport strategy in passport.js." });

      // No error but already a user registered
      if (user) return done(null, false, { message: "Please choose another email." });
      console.log(email + " " + password)
      var newUser            = new User();
      //console.log(req.body) // is coming out
      //newUser.username = username;
      newUser.email    = email;
      console.log(newUser.email) // is coming out as email
      //newUser.username = req.body.user.username;
      newUser.password = User.encrypt(password);
      console.log(newUser.password) // is making password and encrypting it

      newUser.save(function(err, newUser) {
      	console.log(newUser.id) // is printing new user
      	console.log(newUser.username)
      	console.log(err + "this is the error") // dup key: { : null }this is the error
      	console.log("this is the user" + newUser) // user is undefined

      	// is erroring here
        // Error found
        if (err) return done(err, false, { message: "Something went wrong." });
        // New user created
        return done(null, newUser);
      });
    });
  })); 
}