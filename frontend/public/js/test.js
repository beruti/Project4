$(test)

// console.log("hello this is the test js file")

function test(){
	console.log("test function hit")
	$("#testid").on("click", updateUser)
	editUser()
	$(".delete-profile-link").on("click", removeUser)
}

// function test(){

// }


// Going through on server side but not returning to token on client side
// means they can log out and sign back in fine but jwt_decode is changing between nesting their info in ._doc and not
//update user
function updateUser(){
	console.log("ajax test hit")
	event.preventDefault();
	var user = {
		user:{
				email: $(".current_user_email").val()
			 }
	}
	$.ajax({
	  type: 'post',
	  url: 'http://localhost:3000/profile/' + jwt_decode(getToken())._id,
	  data: user,
	  beforeSend: setRequestHeader
	  // is hitting
	  // where is it rerouting?
	  // dont event want it going anywhere - event prevent default
	}).done(function(data){
		console.log(data)
	})
	// IS NOT updating the token
}

// EDIT user
function editUser(){
	//var current_user_email = jwt_decode(getToken())._doc.email
	//$(".current_user_email").val(current_user_email);
	console.log("editUser hit")
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/profile/' + jwt_decode(getToken())._id,
    beforeSend: setRequestHeader
  }).done(function(user){
    // .local as their user is nested inside a local object in model
    console.log("hello edit user ajax request complete")
    console.log(user.user.email)
     // targeting html elements to populate
    //$("input#edit-username").val(user.user.local.username),
    //$("input#edit-firstName").val(user.user.local.firstName),
    //$("input#edit-lastName").val(user.user.local.lastName),
    //$("input#edit-email").val(user.user.local.email),
    //$("input#edit-password").val(user.user.local.password),
    //$("input#edit-image").val(user.user.image),
    //$("input#edit-bio").val(user.user.bio),
    //$('#edit-user').slideDown()
     // $('form#edit-post').slideDown()
   $(".current_user_email").val(user.user.email)
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  //$('.edit-user').on('submit', updateUser.bind(this));
}

// function deleteUser(){
// 	event.preventDefault();
// 	console.log("deleteUser hit")
// 	$.ajax({
// 		type:
// 	})
// }
// REMOVE item - user
function removeUser(){

  event.preventDefault();
  // var itemToRemove = $(this).parent();
  // var urldata = $(this).data().id;

  // swal({   title: "Are you sure you want to delete your account?",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Delete",   cancelButtonText: "Cancel",   closeOnConfirm: true,   closeOnCancel: true }, function(isConfirm){   if (isConfirm) {     
    console.log("ajax being made")
    $.ajax({
      url:'http://localhost:3000/profile/'+ jwt_decode(getToken())._doc._id, // cannot delete from here?
      type:'delete',
      beforeSend: setRequestHeader
    }).done(function() {
    	console.log("delete done")
      //itemToRemove.remove();
      removeToken();
      loggedOutState();
      window.location.href = '/';
    }); 

  }   

// set request header to include token
function setRequestHeader(xhr, settings) {
	console.log("trying to set request header")
 var token = getToken();
  console.log(token)
 if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}
