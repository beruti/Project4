// angular
// 	.module('emergencyservices')
// 	// name controller for use in rest of app in first argument and pass it business logic with second argument  
// 	.controller('usersController', UserController)

// // inject dependences of User factory and TokenService
// UserController.$inject = ['User', 'TokenService']
// // function arguments will inherit dependencies in order written corresponding to order written in array
// function UserController(User, TokenService){
// 	var self = this;

// 	// array of all users
// 	self.all = [];
// 	// user object
// 	self.user = {};

// 	// function handleLogin(res){

// 	// }

// }


angular
	.module('emergencyservices')
	// name controller for use in rest of app in first argument and pass it business logic with second argument  
	.controller('usersController', UserController)

// inject dependences of User factory 
// user factory is using resource rather than $http - so dont think i need to include it
UserController.$inject = ['User', 'TokenService']
// function arguments will inherit dependencies in order written corresponding to order written in array
function UserController(User, TokenService){
	var self = this;

	// array of all users
	self.all = [];
	// user object
	self.user = {};
	
	self.getUsers = function() {
	  self.all = User.query();
	}


	return self;
}

// angular
//   .module('YearBookApp')
//   .controller('UsersController', UsersController);

// UsersController.$inject = ['$http'];
// function UsersController($http){

//   var self             = this;
//   self.users           = [];
//   self.user            = {};
//   self.getUsers        = getUsers;
//   self.createUser      = createUser;
//   self.removeUser      = removeUser;
//   self.updateUser      = updateUser;
//   self.showUser        = showUser;
//   self.editUser        = editUser;

//   self.toggleEditForm  = toggleEditForm;
//   self.toggleUserForm  = toggleUserForm;
//   self.toggleShowUsers = toggleShowUsers;

//   function getUsers(){
//     $http
//     .get('http://localhost:3000/users')
//     .then(function(response){
//       console.log(response);
//       self.users = response.data;
//     });
//   }

//   function showUser(user){
//     $('#users').slideUp();
//     $http
//       .get('http://localhost:3000/users/' + user._id)
//       .then(function(response){
//         console.log(response)
//         self.user = response.data;
//         $('#show').slideDown();
//         $('#projects').slideDown();
//       });
//   }

//   function createUser(){
//     $http
//     .post('http://localhost:3000/users', { user: self.user })
//     .then(function(response) {
//       self.user = response.data;
//       self.users.push(self.user);
//       // self.user = {};
//       toggleUserForm();
//       $('form#new-user').trigger("reset");
//     });
//   }

//   function removeUser(user){
//     $http
//       .delete('http://localhost:3000/users/' + user._id)
//       .then(function(response){
//         // var index = self.users.indexOf(user);
//         // self.users.splice(index, 1);
//         getUsers();
//       });
//   }

//   function editUser(user){
//     $http
//       .get('http://localhost:3000/users/' + user._id)
//       .then(function(response){
//         self.user = response.data;
//         toggleEditForm();
//       });
//   }

//   function updateUser(){
//     $http
//       .patch('http://localhost:3000/users/' + self.user._id, { user: self.user})
//       .then(function(response){
//         getUsers();
//         toggleEditForm();
//       });
//   }

//   function toggleShowUsers(){
//     $("#show").slideUp("slow");
//     $("#projects").slideUp("slow");
//     setTimeout(function(){
//       self.user = {};
//       $('#users').slideDown();
//     }, 600);
//   }

//   function toggleUserForm(){
//     $("form#new-user").slideToggle("slow");
//   }

//   function toggleEditForm(){
//     $("form#edit-user").slideToggle("slow");
//   }

//   getUsers();

// }
