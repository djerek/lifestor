function whereAreYou(markerSpot, nearPlaceAlert){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var whereAreYouPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log('markerSpot.position.jb' + markerSpot.position.jb)
    whereAreYouPosLat = whereAreYouPos.jb
    whereAreYouPosLong = whereAreYouPos.kb
    markerSpotLat = markerSpot.position.jb
    markerSpotLong = markerSpot.position.kb
    markerSpotLatHigh = (markerSpotLat + .0005)
    markerSpotLatLow = (markerSpotLat - .0005)
    markerSpotLongHigh = (markerSpotLong + .0005)
    markerSpotLongLow = (markerSpotLong - .0005)
    console.log('markerspotlathigh' + markerSpotLatHigh + 'whereareyoupostlat' + whereAreYouPosLat)
      if((markerSpotLatHigh >= whereAreYouPosLat) && (markerSpotLatLow <= whereAreYouPosLat) && (markerSpotLongHigh >= whereAreYouPosLong) && (markerSpotLongLow <= whereAreYouPosLong)) {
        console.log(markerSpot)
        alert(nearPlaceAlert)
      }
      }, function() {
      handleNoGeolocation(true);
    });
  } 
  else
  {

    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}
// alert(gon.locations)
// alert(gon.location_entries_array.length)

/**
 * The HomeControl adds a control to the map that
 * returns the user to the control's defined home.
 */

// Define a property to hold the Home state
HomeControl.prototype.home_ = null;

// Define setters and getters for this property
HomeControl.prototype.getHome = function() {
  return this.home_;
}



/** @constructor */
function HomeControl(controlDiv, map, home) {

  // We set up a variable for this since we're adding
  // event listeners later.
  var control = this;

  // Set the home property upon construction
  control.home_ = home;

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var goHomeUI = document.createElement('div');
  goHomeUI.style.backgroundColor = 'white';
  goHomeUI.style.borderStyle = 'solid';
  goHomeUI.style.borderWidth = '2px';
  goHomeUI.style.cursor = 'pointer';
  goHomeUI.style.textAlign = 'center';
  goHomeUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(goHomeUI);

  // Set CSS for the control interior
  var goHomeText = document.createElement('div');
  goHomeText.style.fontFamily = 'Arial,sans-serif';
  goHomeText.style.fontSize = '12px';
  goHomeText.style.paddingLeft = '4px';
  goHomeText.style.paddingRight = '4px';
  goHomeText.innerHTML = '<b>Home</b>';
  goHomeUI.appendChild(goHomeText);

  // Set CSS for the setHome control border
 

  // Set CSS for the control interior
 
  // Setup the click event listener for Home:
  // simply set the map to the control's current home property.
  google.maps.event.addDomListener(goHomeUI, 'click', function() {
    var currentHome = control.getHome();
    currentHome.jb = addressLatitude
    currentHome.kb = addressLongitude
    console.log(currentHome);
    map.setCenter(currentHome);
  });

  // Setup the click event listener for Set Home:
  // Set the control's home to the current Map center.
  
}

///////////////////

var geocoder;
var map;
var infowindow;

function initialize() {

  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  // click makes event
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var currentLocationWindow = "<a href='" + $('#new_entry_path').data('path') 
      + "&latitude=" + pos.jb 
      + "&longitude=" + pos.kb 
      +  "'>Make entry at current location</a>"
// sets request to ask for stores, bars, ... near the location
//     var request = {
//     location: pos,
//     radius: 80,
//     types: ['store','bar', 'bank', 'casino', 'park']
//   };
// // actually calls the request
//    infowindowplace = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,

        content: currentLocationWindow + '<br>click on the map to add a marker'
          + "<br>current latitude: " + position.coords.latitude
          + "<br>current longitude: " + position.coords.longitude
      });

      
      // Current User Home Address is turned into lat and long


// console.log(address)

      addressLatitude = gon.current_user.latitude
      addressLongitude = gon.current_user.longitude
      console.log('address latitude in initialize' + addressLatitude)
      areYouHome(addressLatitude, addressLongitude)


      // Create the DIV to hold the control and
      // call the HomeControl() constructor passing
      // in this DIV.
      var homeControlDiv = document.createElement('div');
      var homeControl = new HomeControl(homeControlDiv, map, pos);

      homeControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  $.each(gon.location_entries_array, markerAtLocations);


}
// this returns a list of places and puts markers on them
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // var content ="";
    for (var i = 0; i < results.length; i++) {
      placeObject = results[i]
      // content = content + placeObject.name + placeObject.vicinity;
      $("#place-results").append('<li>' + placeObject.name + '</li>' + '<li>' + placeObject.vicinity + '</li>');
      console.log("from callback" + placeObject.vicinity);
    }
  }
}

// function createMarker(place) {
// // alert(place.name)
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });
//   var reverselatlong = new google.maps.LatLng(marker.position.jb, marker.position.kb)
//   console.log("reverselatlong" + reverselatlong)
//   geocoder.geocode({'latLng': reverselatlong}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       if (results[1]) {
//         reversegeocode = results[1].formatted_address
//         console.log(reversegeocode)
  

//   google.maps.event.addListener(marker, 'click', function() {
//     alert(place.name + reversegeocode)
//     // infowindowplace.setContent(place.name + reversegeocode + "<a href='" + $('#new_entry_path').data('path') + "&latitude=" + marker.position.jb + "&longitude=" + marker.position.kb + "&address=" + reversegeocode + "&place=" + place.name + "'>testing</a>");
//     // infowindowplace.open(map, this);
//   });
//       } else {
//         alert('No results found');
//       }
//     } else {
//       alert('Geocoder failed due to: ' + status);
//     }
//   });


// }

function markerAtLocations(index, array) {
  // alert(array[0].latitude)

  var pos = new google.maps.LatLng(array[0].latitude, array[0].longitude)
  // alert("hi " + location.address)

  var marker = new google.maps.Marker({
    map: map,
    position: pos
  });
  // console.log("marker position in marker at locations" + marker.position)
  markerSpot = marker
  var contentString = "<a href='" + $('#new_entry_path').data('path') + "&latitude=" + marker.position.jb + "&longitude=" + marker.position.kb + "'>add another entry to this location?</a>" 
    + "<br>title: " + array[0].title 
    + "<br>latitude: " + array[0].latitude + "<br>longitude: " + array[0].longitude

  for (var i = 1; i < array.length; i++) {

    nearPlaceAlert = 'you made an entry near this spot, and you called it:' + array[i].title + 'and you said:' + array[i].message
    // whereAreYou(markerSpot, nearPlaceAlert)

    contentString = contentString + "<br>Entry " + i + " title: " + array[i].title
      + "<br>message: " + array[i].message
  }
  
  



  



  // var contentString;
  // for

  // infowindow closes if you click on it again
  var infowindow = null;

  google.maps.event.addListener(marker, 'click', function() {
    if (infowindow) {
      infowindow.close();
      infowindow = null;
      console.log("closing");
    }
    else {
      infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(map,marker);
      console.log("opening");
    }
  });
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
