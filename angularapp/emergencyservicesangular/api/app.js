//THIS IS THE MIDDLEWARE FILE - every response and request is run through this file

// node framework 
var express        = require('express');
// cross origin resource sharing - makes use of localStorage and thus may be necessary for jwt as token is stored here
var cors           = require('cors');
// utilities for handling and transforming file paths
var path           = require('path');
// error logger
var morgan         = require('morgan');
// json interpreter
var bodyParser     = require('body-parser');
// object document model interpreter - provides means to speak to mongo database
var mongoose       = require('mongoose');
// authentication ware - for encrypting password
var passport       = require('passport');
// cookie interpreter/deconstructor = should not be needed here
var cookieParser   = require("cookie-parser");
// helps pass over get/post and expand http requests - allowing hidden methods on forms - methodOverride will interpret these hidden methods on back end
var methodOverride = require("method-override");
// used to store authenticated and encrypted user and grant access to certain areas of site that require a jwt
// is passed in header of all requests
var jwt            = require('jsonwebtoken');
// jwt specific to the express framework
var expressJWT     = require('express-jwt');
// app variable to inherit express framework
var app            = express();
// using variables abstracted to config file
var config         = require('./config/config');
// using model that is abstracted in models folder
var User           = require('./models/user');
// using secret variable that is abstracted in config - is key element in creating json web token
var secret         = require('./config/config').secret;

//----------------------------------MIDDLEWARE DEFINED, NOW HAVE TO STATE WHICH TO USE----------------------

// connect to database (config.database = mongodb://localhost:27017/passport-and-jwts)
mongoose.connect(config.database);

// requiring passport
require('./config/passport')(passport);

// use methodOvveride as middleware
app.use(methodOverride(function(req, res){
  // if there is an object in the body of the request and the typeof the request.body is an object and there is a hidden method denoted by _method THEN execute the middleware 
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    //set the method to the method defined by the hidden method _method
    var method = req.body._method
    // clear the req.body._method so as to avoid processing hidden method twice
    delete req.body._method
    // return the method - ie the hidden method - so that is can be passed as the method to use for http verb
    return method
  }
}));

//translate req.body to json format
app.use(bodyParser.json());
// url encode req.body
app.use(bodyParser.urlencoded({ extended: true }));
// use cookieParser
app.use(cookieParser());
// use error logger and specify developer environment
app.use(morgan('dev'));
// use CORS
app.use(cors());
// necessary to start passport technology (would need .sessions is using sessions too)
app.use(passport.initialize());

// restrict all routes to require a jwt token except for login and register which the user is allowed to post to to sign up/login
app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));

// error handling middleware - will give error object if error occurs
app.use(function (err, req, res, next) {
  //if error object name is equal to unauthorized error then execute..
  if (err.name === 'UnauthorizedError') {
    // return status 401 if unauthorized error and send a json message saying unauthorized request - will show in terminal
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  // cycle to next request,response
  next();
});

// include routes that are abstracted in config/routes
var routes = require('./config/routes');
// user api on the front of all routes
app.use("/api", routes);

app.listen(3000);