# Project4


Testing Bonzo

Get a map on the page
- make div and then plugin
- done

get map to show a hospital

map now loops through array of hospitals to populate




get forms running that store to database

Patient form
- establish schema
- make form
- make input fields correspond to model
- check it is submitting to route

- what page will lead them to this?
- rendered by route? yes URL route - matches to controller action - controller action should render page
-- is this how it works with html file - should do
- we have been using states in angular but what determined something as the page that is hit when you put in the URL?

GET FULLY FUNCTIONAL SIGN UP WORKING

hosting with python simpleHTTPServer 
- what does this do exactly?
- it doesnt mean that i can access the static pages in my front-end as far as i can see
- how is it working in our angular apps?

-- automatically searching for index.html file?
- one already exists here so why wont it load it?
it will but it has to go into public folder first
- this means sign up should be in an index.html file unless i change the setting of my python server to automatically look for sign up


BUT how to connect this to the back?
- they are not linked at all at the moment
- need to use AJAX potentially
- look for completed example from class - when we first started doing ajax

SO
can load static page
BUT will need ajax request to make a post to ther server - will then have to get/set and remove token etc with sign up in app.js in js on front-end folder

DECISION MADE - NO DISPATCHER
- TICKET WILL GO STRAIGHT TO AMBULANCE
- DISPATCH WILL BE BUILT ON COMPLETION

- POINT OF APP IS TO USE SOCKETS and Google Maps NOT a booking system

++++++++++++++++++++++++++++++
WHATS NEXT
When they login they should be taken to a new page
- done
Get it so they can add all relevant info
- done/know how to
Show Log Out - make sure it removes token
- done
Get CRUD Actions working for user

+++++++++++++++++++++++++++++++++

Cannot get log in to work
- what are the first steps going on when the form is on the page and you have hit the submit
- it is on the front end and so it is trying to communicate with the backend 
- surely it should be a get request as they want to compare what is being submitted with the pre-existing BUT in order to compare info must first be submitted so it is indeed a POST request
- so check that a post request is being made via AJAX
- for a start is the targeting correct
- the login form should have an id of "login-form"
THIS fixed it

BUT now it is not routing correctly as I want it to head to elsewhere - specifically patient/landingpage
cannot reach there using location.href for somereason
check with a console log it is even hitting this area of the code or skipping entirely
- was being written in a temporary file (not right place)

NOW have a redirect working


Get it so they can add all relevant info
- expand form
- expand model to accomodate
- bring up on landing page to check all is there
- where is this information going though - where is it being stored? check mongo
- is NOT storing in mongo currently

What is happening - instantiate an object User 
User should be passed all the information with which it is made
- this is specified in passport? 
--> it seems this is where the User object is instantiated and then assigned key value pairs from form

Cannot do that as PASSPORT will not let you as authentication is far more complicated than it is letting on and therefore it wont allow you to do anything other than what they specify 
- so where to add!
- look to completed project for answer!! (accept it isnt properly working on github!)

FOUND 
had commented out req, email, password, done
- needed to retrieve new features in req.body eg newUser.bloodtype in req.body.bloodtype

===========================
Make log out function
- where shall button go 
-- in a place where they are logged in
- on landingpage.html basically

WORKS but should probably be in nav bar
========================
Get CRUD actions working for user
( nice to have
- need dispatch to have view of all users)
- user should be able to delete their profile
- user should be able to edit their profile

- in authentication.js how is deleteUser function any different from logout apart from prevent default
- what steps need to be taken to remove from database too - delete request - will be contained in html attribute

-------EDIT profile currently being ripped
- placing profile.html
- link has been made using location.href
- token is sent with it accordingly
- what info do you want on profile page
- see if they can edit an email address first

- show user information on page
- need jwt decode - BUT will this translate to back-end - unsure as of yet
- is populating email value but how to send to back 
--> where is this submitting at the moment?
- need AJAX call


corresponding back-end stating update

- check connection between back and front
- need data input
method patch to /profile
- check backend what route this is hitting
- working 
need user id though
TOKEN ID IS the same as userID
token generated by jwt using the user id generated by mongo

- data capture on front
- data send with ajax to back
- data input to db with back end control
- DONE for email

DELETE
- button on profile page
- set up back end to delete user in controller
- ajax call to back end to delete 





- ticketing form





