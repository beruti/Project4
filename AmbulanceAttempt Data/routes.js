var express  = require('express');
var router   = express.Router();
var passport = require("passport");

//require controllers
var usersController = require('../controllers/usersController');
//var postsController = require('../controllers/postsController');
var authenticationsController = require('../controllers/authenticationsController');
//authentication routes
router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

// patient routes
router.route('/')
	.get(usersController.userSignUpForm) 

 router.route('/profile')
 	.get(usersController.test)

router.route('/profile/:userid')
	.post(usersController.userUpdate)
	.get(usersController.userShow)
	.delete(usersController.userDelete);

module.exports = router;