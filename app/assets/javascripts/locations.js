// alert(gon.entries)

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

function initialize() {

  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 8,
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

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,

        content: currentLocationWindow + '<br>click on the map to add a marker'
          + "<br>current latitude: " + position.coords.latitude
          + "<br>current longitude: " + position.coords.longitude
      });

      
      // Current User Home Address is turned into lat and long

      var address = gon.current_user.address;
// console.log(address)
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      addressLatitude = results[0].geometry.location.jb
      addressLongitude = results[0].geometry.location.kb
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

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

  $.each(gon.entries, markerAtLocations);

}

function markerAtLocations(index, entry) {
  // var pos = new google.maps.LatLng(entry.latitude, entry.longitude)
  // console.log("pos before geocode")
  // console.log(pos)
  var address = entry.address
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log("this is the address")
    console.log(address)
    if (address == "") {
      entryaddresslatitude = entry.latitude
      entryaddresslongitude = entry.longitude
      console.log('entryaddresslatitude when address = ""')
      console.log(entryaddresslatitude)
    } else if (status == google.maps.GeocoderStatus.OK) {
      entryaddresslatitude = results[0].geometry.location.jb
      entryaddresslongitude = results[0].geometry.location.kb
      
      console.log("entryaddresslatitude when address is a thing")
      console.log(entryaddresslatitude)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }

  // console.log("entryaddresslatitude")
  //     console.log(entryaddresslatitude)
  var pos = new google.maps.LatLng(entryaddresslatitude, entryaddresslongitude)

  // pos.jb = entryaddresslatitude
  // pos.kb = entryaddresslongitude
  console.log("pos")
  console.log(pos)
  
  
  // alert(entry.latitude + "<--latitude, longitude-->" + entry.longitude)
  var marker = new google.maps.Marker({
    map: map,
    position: pos
  });


  // console.log("marker.position")
  // console.log(marker.position)

  var contentString = "title: " + entry.title + "<br>message: " + entry.message 
    + "<br>latitude: " + entry.latitude + "<br>longitude: " + entry.longitude

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
});
}

function placeMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });

  console.log(marker.position);
  var contentString = "<a href='" + $('#new_entry_path').data('path') + "&latitude=" + marker.position.jb + "&longitude=" + marker.position.kb +  "'>Click to add</a>"

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  infowindow.open(map,marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  map.panTo(location);
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
function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
