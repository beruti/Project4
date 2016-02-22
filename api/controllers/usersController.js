
//AI
var User = require('../models/user');

// function getAll(request, response){
//   User.find({}, function(err, users) {
//     if (err) return response.status(404).send(err);

//     response.render('index', {users: users})
//   });
// }

//////////////////////////////////////////
function userSignUpForm(req, res){
	res.render('signup.html');
};

//////////////////////////////////////////////////////////
// function editUser(request, response){
// 	  var id = request.params.id;

// 	  User.findById(id, function(error, user) {
// 	    if(error) console.log(error)

// 	    response.render('editUser', {"user": user});
// 	  });
// 	}

// //////////////////////////////////////////////////////////
// //// AI function to show User profile
// function userShow(req, res){
// //  // select user particular to input URL
//   var id = req.params.id;
// //
//   // find by ID 
// //  //populate users comments (corresponding to comments in users model)
// //  // error check and send user data on success
//   User.findById({ _id: id }).exec(function(err, user) {
// //    //include error messages
//     if (err) return res.status(500).send(err);
//     if (!user) return res.status(404).send(err);
// //
// //    // if all ok then send user data in json
//     //res.status(200).send(user);
//     res.render('showUser', {"user": user})
//   })
// }
// /////////////////////////////////////////////////////////
// //// AI edit profile
// function userUpdate(req, res){

// 	var id = req.params.id;
// 	////mongoose command
// 	////Model.findByIdAndUpdate(id, [update], [options], [callback])
// 	//// {new: true} - cannot claim i understand this part
// 	console.log(req.body)
// 	User.findById(id, function(error, user){
// 	  if (error) console.log("hello fresh") // not printing so maybe it is working
// 	  if (user){
// 	  	console.log(user) // is printing but undefined
// 	  	//console.log(req.body.user[username]) // is not allowed

// 	  	user.username = req.body.user.username;
// 	  	user.email = req.body.user.email;
// 	  	user.password = req.body.user.password;
// 	  }

// 	  user.save(function(error){
// 	  	 if(error) console.log(error)
// 	  	res.redirect('/users/' + id)
// 	  });

// 	});
// }
// function test(){
//   console.log("testing")
// }


//update user
function userUpdate(req, res) {
  //console.log(req.params.userid) //prints userid
  //res.send("hello user update")
  User.findById({_id: req.params.userid}, function(err, user) {
     if (err) return res.status(500).json({message: "Error"});
     if (!user) return res.status(404).json({message: "User does not exist."});
 console.log("this is the user argument "+ user)
 console.log(req.body.user.email)
 console.log(user.email)
 // if a change has been made to email field then it will overwrite the prexisting email of the user that is stored in user.email
 if (req.body.user.email) user.email = req.body.user.email;
 console.log(user)
 // not saved yet though
  //   // if (req.body.firstName) user.local.firstName = req.body.firstName;
  //   // if (req.body.lastName) user.local.lastName = req.body.lastName;
  //   if (req.body.email) user.local.email = req.body.email;
  //   // if (req.body.image) user.image = req.body.image;
  //   // if (req.body.bio) user.bio = req.body.bio;

     user.save(function(err, updatedUser) {
      console.log(updatedUser)
       if (err) return res.status(500).json({message: "Error"});
        res.status(201).json({message: "User updated", user: updatedUser});
        
     });
   });
}


//get individual user 
function userShow(req, res) {
  console.log("userShow hit")
  User.findById({_id: req.params.userid}).exec(function(err, user) {
    if (err) return res.status(404).json({message: "Error"});
    res.status(200).json({user: user});
  });
}



//// AI: make all actions available in scope
module.exports = {	
	//------------------user CRUD--------------------
	//getAll : getAll,
	userSignUpForm: userSignUpForm,
  //test: test,
	//createUser: createUser,
	userUpdate: userUpdate,
	userShow:   userShow
	// editUser: editUser,
	// userDelete: userDelete
};
