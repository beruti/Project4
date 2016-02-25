how patient signup works

right now aim is to test with postman:

- patient will be entering data
- need schema to give data structure so database knows what to expect
- check schema in models - patient.js
- firstName and lastName with no validation - checked
- there is a route matching patientsController to signin and signup
- it is a post route but where is this info storing - in the database and in the style of the schema 
- check actions in controller are module exported
- the actions are not in patientsController
- either add or check where they should be
- they are passport and jwt related so may be stored elsewhere

- on check of project 3
- sign up is handled with a local-signup strategy  using passport authentication
- token is then assigned using the secret and the user that has been authenticated with passport
(user here will be patient)
- to make user you must therefore have in place the local-signup strategies of passport available
- authentications controller communicates with the passport controller

========
https://scotch.io/tutorials/easy-node-authentication-setup-and-local

-- BUT this doesnt use JWT - this tutorial uses sessions instead

It is important to use JWT instead of sessions as JWT is sent in the header of an XHR or http request and thus is the only way to allow one page apps 

NOTE:
• JWT is not encrypted 
• password encryption is handled by passport and stored in server

why JWT?
https://www.youtube.com/watch?v=EypyCWyQl04&feature=youtu.be

Also continuing to look at sessions tutorial to see why not sessions:

http://machinesaredigging.com/2013/10/29/how-does-a-web-session-work/

sessions are on the server side in this context
- still unclear as to why sessions over cookies other than this

++++++++++++++++++++++++++++++++++++++++++++
http://stackoverflow.com/questions/3804209/what-are-sessions-how-do-they-work

Because http is stateless, in order to associate a request to any other reques, you need a way to store user data between HTTP requests.

Cookies or URL parameters ( for ex. like http://example.com/myPage?asd=lol&boo=no ) are both suitable ways to transport data between 2 or more request. However they are not good in case you don't want that data to be readable/editable on client side.

The solution is to store that data server side, give it an "id", and let the client only know (and pass back at every http request) that id. There you go, sessions implemented. Or you can use the client as a convenient remote storage, but you would encrypt the data and keep the secret server-side.

Of course there are other aspects to consider, like you don't want people to hijack other's sessions, you want sessions to not last forever but to expire, and so on.

In your specific example, the user id (could be username or another unique ID in your user database) is stored in the session data, server-side, after successful identification. Then for every HTTP request you get from the client, the session id (given by the client) will point you to the correct session data (stored by the server) that contains the authenticated user id - that way your code will know what user it is talking to. 
+++++++++++++++++++++++++++++++++++++++++++++++

USING JWT

========

------ 
how does this impact app.js?
------- write route middleware to restrict the app
-------- passport and passport-local package, bcrypt and bcrypt-nodejs



NOTE - WHERE TO REQUIRE/WHERE USED
• passport is required in app.js for initialize function
• passport-local is NOT needed in app.js but IS needed in passport.js in config folder
•bcrypt is used in the MODEL so underneath the patient schema - it must therefore be required in that file

and 

what details of signup will actually be stored to database so i can check signup is working?
- whatever you give to the passport sign up strategy to create the patient
------

Time to implement

bcrypt first in patient model
- done
passport in passport.js in config
- done (may error as used patient instead of user in some instances)
authenticationsController
- done but not rendering a page when login occurs?
- may be issues due to patient not user
is everything hooked up in routes
- done
is everything hooked up in app.js
- done


half an hour atleast wasted
-- you HAVE to say USER for passport localSignUp Strategy to work - not allowed to be PATIENT









- test with postman


