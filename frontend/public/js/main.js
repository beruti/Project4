$(document).ready(function(){

	console.log("hello")

	//make map appear on page
	// target dom element and populate 
	// specify what segment of map and its style
	var googleMapTest = function() {

		// instantiate map object
		map = new google.maps.Map(document.getElementById('googleMap'), {
			//set center
		  center: {lat: 20, lng: 0},
		  // set zoom level to global overview
		  zoom: 2,
		  // road style
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  // defualt user interface disabled
		  disableDefaultUI: true,
		  // christ knows where he found this
		  styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f0df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#d4e9b6"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c3e2aa"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#c9bfd1"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#B3CADD"}]}]
		});
	}

	googleMapTest();
	// array has to be defined before it can be pushed into
	var markersArray = [];

	// // function to add marker to map
	// function addPlaceMarker(name,lat,lng) {
	// 	// making new point demarked by latitude and longitude
	//   var latlng = new google.maps.LatLng(lat,lng);

	//   // var contentString = "<p>" + name + "</p>";
	//   // 	// make marker appear above place
	//   // var infowindow = new google.maps.InfoWindow({
	//   //     content: contentString
	//   // });
	// 	//console.log(latlng)
	//   	// adding marker
	//   	console.log(marker)
	//   var marker = new google.maps.Marker(
	//   {
	//   	//position on map
	//     position: latlng,
	//     //
	//     map: map,
	//     title: name
	//   });
	//   console.log(marker)
	//   // push to array
	//   markersArray.push(marker);
	//   console.log(markersArray)
	//   // is coming out

	//   // // infowindow displays on mouseover
	//   // marker.addListener('mouseover', function() {
	//   //   infowindow.open(map, marker);
	//   // });

	//   // marker.addListener('mouseout', function() {
	//   //   infowindow.close();
	//   // });

	//   }
	//   // has added london to page!
	//   addPlaceMarker("bob",51.52864165, -0.10179430)
	//   // add a second marker
	//   addPlaceMarker("testmarker2",41.52864165, -0.10179430)

	//   // make a loop to add multiple places at same time
	//   addPlaceMarker("bob",51.52864165, -0.10179430)

	 // var names= ["bob", "susy", "john"]
	 // var latitude= [51.52864165, 41.52864165, 31.52864165]
	 // var longitude = [-0.10179430]

	 // what are you trying to do?
	 // loop over array of data and pass as argument to function addPlaceMarker
	 // not necessary right now
	 addPlaceMarkersArray = [{name: "bob",
	 						  lat: 51.52864165,
	 						  lng: -0.10179430}
	 						  ,
	 						  {name: "testmarker2",
	 						  lat: 41.52864165,
	 						  lng: -0.10179430}
	 						  ,
	 						  {name: "testmarker3",
	 						   lat: 31.52864165,
	 						   lng: -0.10179430}
	 						   ]
	 //console.log(addPlaceMarkersArray[0])

	var testmarkeradder = function(){



		function addPlaceMarker(name,lat,lng) {
			// making new point demarked by latitude and longitude
		  var latlng = new google.maps.LatLng(lat,lng);

		  // var contentString = "<p>" + name + "</p>";
		  // 	// make marker appear above place
		  // var infowindow = new google.maps.InfoWindow({
		  //     content: contentString
		  // });
			//console.log(latlng)
		  	// adding marker
		  	//console.log(marker)
		  var marker = new google.maps.Marker(
		  {
		  	//position on map
		    position: latlng,
		    //
		    map: map,
		    title: name
		  });
		  //console.log(marker)
		  // push to array
		  markersArray.push(marker);
		  console.log(markersArray)
		  // is coming out

		  // // infowindow displays on mouseover
		  // marker.addListener('mouseover', function() {
		  //   infowindow.open(map, marker);
		  // });

		  // marker.addListener('mouseout', function() {
		  //   infowindow.close();
		  // });

		  }

		var markerloop = function(){ for(i=0; i<addPlaceMarkersArray.length; i++){
		 	//console.log(addPlaceMarkersArray[i])
		 	name = (addPlaceMarkersArray[i].name)

		 	lat = (addPlaceMarkersArray[i].lat)
		 	lng = (addPlaceMarkersArray[i].lng)
		 	//console.log(name, lat, lng)
		 	addPlaceMarker(name, lat, lng)
		 }
		}

		markerloop()
		//console.log(name) // returns the last name made by loop
		//console.log(markerloop) // prints the function you want what it makes

		// gives object with name, lat, lng properties

		// need to pass these into addPlaceMarker function

	}

	testmarkeradder()


});
