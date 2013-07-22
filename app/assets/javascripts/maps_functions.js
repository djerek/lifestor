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

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });

      var contentString = "<a href='" + $('#new_entry_path').data('path') + "&latitude=" + marker.position.jb + "&longitude=" + marker.position.kb + "&address=" + address + "'>Click to add</a>"
      var infowindow = new google.maps.InfoWindow({
        content: "address: " + address + "<br>" + contentString
      });
      infowindow.open(map,marker);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// get coordinates of place typed into entry form
function formAddress() {

  // get what's typed in address input form
  var address = document.getElementById('form-address').value;

  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      // map.setCenter(results[0].geometry.location);
      var latitude = results[0].geometry.location.jb
      var longitude = results[0].geometry.location.kb

      // results[0].geometry.location.latitude
      console.log("RIGHT HERE YO: LATITUDE:")
      console.log(latitude)
      console.log("longitude!:")
      console.log(longitude)

      $("#form-latitude").val(results[0].geometry.location.jb);
      $("#form-longitude").val(results[0].geometry.location.kb);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// use current location on entry form
function formCurrentLocation() {
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      
      // set lat and long to current coordinates
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      $("#entry_latitude").val(latitude);
      $("#entry_longitude").val(longitude);

    }, function() {
      handleNoGeolocation(true);
    });

  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

}
