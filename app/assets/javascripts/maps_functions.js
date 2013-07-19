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