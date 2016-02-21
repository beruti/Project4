var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done) {
    // Find a user with this email
    User.findOne({ email : email }, function(err, user) {
      console.log("looking for a user........." + user)
      if (err) return done(err, false, { message: "Something went wrong with passport strategy in passport.js." });
      // No error but already a user registered
      if (user) return done(null, false, { message: "Please choose another email." });
      // create instance of User and pass data from registration form
      var newUser            = new User();
      newUser.email    = email;
      newUser.age      = req.body.age;
      newUser.bloodtype= req.body.bloodtype;  
      newUser.password = User.encrypt(password);
      
      //save newUser object to database with mongoose
      newUser.save(function(err, newUser) {
        // Error found
        if (err) return done(err, false, { message: "Something went wrong." });
        // New user created
        return done(null, newUser);
        console.log(newUser)
      });
    });
  })); 
}