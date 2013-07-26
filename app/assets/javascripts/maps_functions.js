// function closeToStuff() {
//   // alert(gon.close_to_here[0][0].id)
//   console.log("closeToStuff is loadin")
//   // get current location
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = new google.maps.LatLng(position.coords.latitude,
//                                        position.coords.longitude);
      
//       // set lat and long to current coordinates
//       var current_lat = position.coords.latitude;
//       var current_long = position.coords.longitude;

//       // put code stuff here

//       // alert(gon.close_to_here[0]);
//       // console.log("after alert")

//       var close_locations = [];
//       for (var i = 0; i < gon.close_to_here.length; i++) {
//         loc_lat = gon.close_to_here[i][1]
//         loc_long = gon.close_to_here[i][2]
//         if ( (current_lat > loc_lat - 0.3) && (current_lat < loc_lat + 0.3) ) {
//           close_locations.push()
//           console.log("success lat! " + loc_lat)
//           alert("you are near: " + gon.close_to_here[i][0].title + "!")
//         }
//         else {
//           console.log("unsuccess lat! " + loc_lat)
//         }
//       }

//     }, function() {
//       handleNoGeolocation(true);
//     });

//   } else {
//     // Browser doesn't support Geolocation
//     handleNoGeolocation(false);
//   }
// }


function pickPlace() {

  console.log("probs loading")
    // defines request terms
    var centerPlace;
    if (!$('#placelat').data('latitude')) 
    {
  
      // if(navigator.geolocation) {
      if (!current_position) {
        console.log("start wait")
        setTimeout(pickPlace,1000)
        console.log("end wait")
      }


      console.log("centerplace current location" + current_position)
      console.log(map)
      nearPlace(current_position)

  
    }
    else
    {
      centerPlace = new google.maps.LatLng($('#placelat').data('latitude'), $('#placelong').data('longitude'));
      console.log("centerplace after click" + centerPlace)
      nearPlace(centerPlace)

    } 

}
function nearPlace(centerPlace) {
    console.log("iiii " + centerPlace)
    var request = {
      location: centerPlace,
      radius: 80,
      types: ['store','bar', 'bank', 'casino', 'park'],
      map: map };
  
    console.log(map + " after request")

  // actually calls the request

  var service = new google.maps.places.PlacesService(map);
  console.log("map  " + map)
  $("#resultshere").empty();
  service.nearbySearch(request, callback);
  document.getElementById('nearbyplaces').style.background="orange";

}

function placeMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });


  var contentString = "<a href='" + $('#new_entry_path').data('path') + "&latitude=" + marker.position.jb + "&longitude=" + marker.position.kb + "'>Click to add</a>"

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  infowindow.open(map,marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  map.panTo(location);
console.log("location:" + location)

  
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

function formPlace(place) {
  var placeLoc = document.getElementById('entry_place').value;
  console.log(placeLoc.geometry)
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc.geometry.location
  });


}

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
      document.getElementById('currentlocationbutton').style.background=null;
      document.getElementById('addressbutton').style.background="orange";

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// use current location on entry form
function formCurrentLocation() {
  if (!current_position) {
    console.log("start wait")
    setTimeout(formCurrentLocation,1000)
    // formCurrentLocation();
    console.log("end wait")
  }

  var tokes = $('#entry_location_tokens').val()
  // alert("U HAVE TOKEEES " + tokes)
  // $('#entry_location_tokens').tokenInput;
  console.log("currentlocation probs loading")
  if (document.getElementById('currentlocationbutton').style.background != "orange") {
    console.log("it's not orange so getting current location");




        $("#form-latitude").val(current_position.jb);
        $("#form-longitude").val(current_position.kb);
        
        // $("#currentlocationbutton").background(color);
        document.getElementById('currentlocationbutton').style.background="orange";
        document.getElementById('addressbutton').style.background=null;
        // document.getElementById('entry_location_tokens').deleteText="DKL";
        console.log("currentlocation probs done")

  }

  // if it is orange, so getting rid of current location
  else {
    alert("it is orange and gonna be not orange");
    document.getElementById('currentlocationbutton').style.background=null;
  }

}
