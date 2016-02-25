var express        = require('express');
//var ejsLayouts     = require('express-ejs-layouts')
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var config = require('./config/config');
var User = require('./models/user');
//var Post = require('./models/post');
//var secret = require('./config/config').secret;

//mongoose database setup
mongoose.connect(config.database);
//console.log(config.database)  // is printing


//set view engine and define view directory 
// app.set('view engine', 'ejs')
// app.use(ejsLayouts)
// app.set('views', './views')

//method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// middleware to use all NPMs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
//require passport
require('./config/passport')(passport);
app.use(passport.initialize());

// error handling middleware
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

/*var routes = require('./config/routes');
app.use("/", routes); */

// WHEN JWT HAS BEEN IMPLEMENTED
app.use("/" ,  expressJWT( { secret: config.secret })
  .unless({
    path: [
      { url: '/register', methods: ['POST'] },
      { url: '/login', methods: ['POST'] },
      { url: '/', methods: ['GET'] },
    ]
  }));

// INCLUDED WITH PASSPORT
//get current user
app.use(function(req, res, next){
  // req.user only with sessions
  // req.user should still work when making request with token


  // conflicts with jwt
  //console.log("hey get current user")
  console.log("--------------------------")
  // this is receiving nothing from a login ONLY getting something from signup
  console.log(req.params); //is empty
  console.log("--------------------------")
  global.currentUser = req.user;
  /// gives user object so cant complain
  // //{ age: '4',
  // bloodtype: 'b',
  // email: 'a.innes9@gmail.com',
  // password: '21' }
  console.log("--------------------------")
  // this is receiving nothing from a login ONLY getting something from signup
  console.log(global.currentUser)
  console.log("--------------------------")

  next();
});

//routes
 var routes = require(__dirname + '/config/routes');
  app.use(routes); 

app.listen(3000);