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

HomeControl.prototype.setHome = function(home) {
  this.home_ = home;
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
  var setHomeUI = document.createElement('div');
  setHomeUI.style.backgroundColor = 'white';
  setHomeUI.style.borderStyle = 'solid';
  setHomeUI.style.borderWidth = '2px';
  setHomeUI.style.cursor = 'pointer';
  setHomeUI.style.textAlign = 'center';
  setHomeUI.title = 'Click to set Home to the current center';
  controlDiv.appendChild(setHomeUI);

  // Set CSS for the control interior
  var setHomeText = document.createElement('div');
  setHomeText.style.fontFamily = 'Arial,sans-serif';
  setHomeText.style.fontSize = '12px';
  setHomeText.style.paddingLeft = '4px';
  setHomeText.style.paddingRight = '4px';
  setHomeText.innerHTML = '<b>Set Home</b>';
  setHomeUI.appendChild(setHomeText);

  // Setup the click event listener for Home:
  // simply set the map to the control's current home property.
  google.maps.event.addDomListener(goHomeUI, 'click', function() {
    var currentHome = control.getHome();
    map.setCenter(currentHome);
  });

  // Setup the click event listener for Set Home:
  // Set the control's home to the current Map center.
  google.maps.event.addDomListener(setHomeUI, 'click', function() {
    var newHome = map.getCenter();
    control.setHome(newHome);
  });
}

///////////////////

var map;

function initialize() {
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

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
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
