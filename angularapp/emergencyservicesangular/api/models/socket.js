//module.exports = function(io){

	//NAMESPACES
	// the default namespace is '/'
	// namespace is identified by io or io.sockets
	// each namespace emits a connection event
	// connection event reaches each Socket instance as a parameter
	//-------------------
	//..for custom namespacing .. http://socket.io/docs/rooms-and-namespaces
	//---------------------
	//ENSURE CONNECTION IS SET ON CLIENT SIDE TOO
	
	//ROOMS
	//rooms are arbitrary channels that sockets can join and leave
	// you can call join to subscribe the socket to a given channel
	// what room does a socket automatically connect to?
	//The default room is joined by a socket and it is the one that corresponds to the random "unguessable, unique identifier Socket#id"
	// dont mistake - each socket does not have a unique id but it is the room that has a unique id and all sockets connect to this room 


	//BROADCASTING
	//"Broadcasting means sending a message to everyone else except for the socket that starts it." 

	// io.on('connection', function(socket){
	// 	console.log('connection')
	// 	//what does the socket object look like
	// 	console.log(socket)
	// 	socket.room = "startroom"
	// 	socket.join(socket.room)
	// })
	// listening on the port - how to make a connection so that i can print and examine this socket object
	// need it on the front end - ie the client side
//}


// include sockets
// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
  // make blank names object
  var names = {};

  
  var claim = function (name) {
    if (!name || userNames[name]) {
      return false;
    } else {
      userNames[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in userNames) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (userNames[name]) {
      delete userNames[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

// export function for listening to the socket
module.exports = function (socket) {
  var name = userNames.getGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;
      
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
};
// export function for listening to the socket on server side
module.exports = function (socket) {
  
  //userNames is only defined in the front end 
  // userNames is a function that contains all methods that keep track of the users names
  var name = userNames.getGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get()
  });

  // notify other clients that a new user has joined
  // cannot read emit of undefined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;

      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
};
