$(init);

function init(){
  // $(".new-post").on("submit", submitForm);
  // $(".edit-post").on("submit", submitForm);
  $('.signup').on("submit", submitFormUser);
  $('.signin').on("submit", submitFormUser);
  $('.edit-user').on("submit", submitFormUser);
   $(".logout-link").on("click", logout); 
   $(".login-link").on("click", signin);
   $(".register-link").on("click", signup);
   $(".sigin").on("submit", submitForm);
   $(".signup").on("submit", submitForm);
   $("body").on("click", ".delete", removeUser);
   $('body').on('click', '.editUser', editUser);
   ////$('.edit-user').on('cancel', hideForm());
   ////$('body').on('click', '.editPost', editPost);
   //$("body").on("click", ".deletePost", removeItem);
   //$('#user-form-button').on('click', newPost);
   //$("body").on("click", ".likePost", likePost);
   //$("body").on("click", ".dislikePost", dislikePost);
   //$('body').on('click', '.profile', setProfile);
   //$('body').on('click', '.category', setCategory);
   //$('body').on('click', '.language', setLanguage);
 getName();
 hideErrors();
 checkLoginState(); 
}

function newPost() {
  clearForms();
  $('#new-post').slideToggle();
  $('#edit-post').slideUp();
}

function hideForm() {
  $("section").hide();
  $("#posts").show();
}

function getName(){
  var url = "http://localhost:3000/profile/" + localStorage.getItem("userID")
 return ajaxRequest("get", url, null, displayUser)
}

function displayUser(data){
  $("#newTitle").prepend("<div class='user-tile'><div class='row'><div class='col-md-12'><img src='" + data.user.image + "' height='200'>" + "<h2>" + data.user.local.firstName + " " + data.user.local.lastName + "</h2><h4>" + data.user.local.username  + "</h4><p>" + data.user.bio + "</p>" + "<a data-id='"+data.user._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='editUser' data-id='"+data.user._id+"'>Edit</a><br>" + "</div></div>"); 
 };

function checkLoginState(){
 if (getToken()) {
   return loggedInState();
 } else {
   return loggedOutState();
 }
}

function signin() {
  event.preventDefault();
  $('#signinsection').slideToggle();
  $('#signupsection').slideUp();
}

function signup() {
  event.preventDefault();
  $('#signupsection').slideToggle();
  $('#signinsection').slideUp();
}

function newPost() {
  $('#new-post').slideDown();
  $('#edit-post').slideUp();
}

//general
function submitForm(){
 event.preventDefault();
 
 var method = $(this).attr("method");
 var url    = "http://localhost:3000" + $(this).attr("action");
 var data   = $(this).serialize();
 
 return ajaxRequest(method, url, data, authenticationSuccessful);
}

//user
function submitFormUser(){
 event.preventDefault();

 var method = $(this).attr("method");
 var url    = "http://localhost:3000/profile/" //+ localStorage.getItem("userID") ;
 var data   = $(this).serialize();

 return ajaxRequest(method, url, data, authenticationSuccessful);
}

// REMOVE item - user
function removeUser(){

  event.preventDefault();
  var itemToRemove = $(this).parent();
  var urldata = $(this).data().id;

  swal({   title: "Are you sure you want to delete your account?",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Delete",   cancelButtonText: "Cancel",   closeOnConfirm: true,   closeOnCancel: true }, function(isConfirm){   if (isConfirm) {     
    
    $.ajax({
      url:'http://localhost:3000/profile/'+ urldata,
      type:'delete',
      beforeSend: setRequestHeader
    }).done(function() {
      itemToRemove.remove();
      removeToken();
      loggedOutState();
      window.location.href = 'index.html';
    }); 

  }})   
}

// EDIT user
function editUser(){

  $("section, #profileDiv").hide();
  $('#edit-user').fadeToggle();

  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/profile/' + localStorage.getItem("userID"),
    beforeSend: setRequestHeader
  }).done(function(user){
    // .local as their user is nested inside a local object in model
    console.log("hello")
    console.log(user.user.local)
    // targeting html elements to populate
    //$("input#edit-username").val(user.user.local.username),
    //$("input#edit-firstName").val(user.user.local.firstName),
    //$("input#edit-lastName").val(user.user.local.lastName),
    $("input#edit-email").val(user.user.local.email),
    //$("input#edit-password").val(user.user.local.password),
    //$("input#edit-image").val(user.user.image),
    //$("input#edit-bio").val(user.user.bio),
    //$('#edit-user').slideDown()
    // $('form#edit-post').slideDown()
  });
  // Bind the clicked element to our updateUser function so that the updateUser function knows what "this" refers to when the updateUser function runs
  $('.edit-user').on('submit', updateUser.bind(this));
}

var updateUser = function(){
  event.preventDefault();
  console.log(this)
  // Get the parent element of the clicked edit anchor tag
  var userDiv = $(this).parent()
  console.log(userDiv);
  var user = {
    //is this correct????
    // user:{
    // local:{
      // username: $("input#edit-username").val(),
      // firstName: $("input#edit-firstName").val(),
      // lastName: $("input#edit-lastName").val(),
      email: $("input#edit-email").val(),
      password: $("input#edit-password").val()
      // },
      // image: $("input#edit-image").val(),
      // bio: $("input#edit-bio").val()
    
  }
  };
  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/profile/' //+localStorage.getItem("userID"),
    data: user.user,
    beforeSend: setRequestHeader
  }).done(function(data){
    // Empty the specific user div and rewrite the html with the updated user that gets returned from our server
    userDiv.empty();



    userDiv.prepend("<div class='user-tile'><div class='row'><div class='col-md-12'><img src='" + data.user.image + "' height='200'>" + "<h2>" + data.user.local.firstName + " " + data.user.local.lastName + "</h2><h4>" + data.user.local.username  + "</h4><p>" + data.user.bio + "</p>" + "<a data-id='"+data.user._id+"' class='delete' href='#'>Delete</a> | <a href='#' class='editUser' data-id='"+data.user._id+"'>Edit</a><br>" + "</div></div>"); 
    $("#profileDiv").show();
    $('#edit-user').fadeOut();
  });
}

/////////////////////////////////////////////////////////

function loggedInState(){
 $("section, .logged-out").hide();
 $("#posts, .logged-in").show();
 return getPosts();
}

function loggedOutState(){
  $("section, .logged-in").hide();
  $("#posts, #signup, #signin, .logged-out").show();
  $('#new-post, #user-form-button, .profileDropDown').hide();
hidePosts();
 return getPosts();}

function logout(){
 event.preventDefault();
 removeToken();
 return loggedOutState();
}

function hideErrors(){
 return $(".alert").removeClass("show").addClass("hide");
}

function authenticationSuccessful(data) {
 if (data.token) setToken(data);
 return checkLoginState();
}

function setToken(data) {
  // set localStorage to 
  localStorage.setItem("userID", data.user._id )
  localStorage.setItem("token", data.token)
  localStorage.setItem("loggedInUserID", data.user._id)
  // localStorage.setItem("category", data.post.category )
  // localStorage.setItem("language", data.post.language )
}

// SET userID in local storage to be the id of the user whose profile you want to see
function setProfile(post){
  console.log($(this).data("id"))
  console.log("setProfile")
  localStorage.setItem("userID", $(this).data("id"))
};

// retrieve token to pass in header
function getToken() {
 return localStorage.getItem("token");
}

// removetoken when logging out
function removeToken() {
 return localStorage.clear();
}

// set request header to include token
function setRequestHeader(xhr, settings) {
 var token = getToken();
 // console.log(token)
 if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}

function ajaxRequest(method, url, data, callback) {
 return $.ajax({
   method: method,
   url: url,
   data: data,
   beforeSend: setRequestHeader,
 }).done(function(data){
   if (callback) return callback(data);
 }).fail(function(data) {
   displayErrors(data.responseJSON.message);
 });
}
