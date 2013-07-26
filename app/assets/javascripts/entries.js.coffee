# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  $('#entry_location_tokens').tokenInput '/locations.json',
    theme: 'facebook',
    propertyToSearch: "title",
    prePopulate: $('#loc-token').data('locationtokens'),
    onAdd: (item) -> hideNewForm()
    onDelete: (item) -> undoHideForm()

  hideNewForm = ->
    console.log("token: " + $('#entry_location_tokens').val());
    gon.location_ids;
    console.log("ids: " + gon.location_ids);
    number = parseInt( $('#entry_location_tokens').val(), 10 );
    console.log("nubma is " + number )

    if number in gon.location_ids

      $("#form-latitude").val(gon.locations[number].latitude);
      $("#form-longitude").val(gon.locations[number].longitude);

      if gon.locations[number].address
        $("#form-address").val(gon.locations[number].address);
        $("#form-address").attr('readonly', 'readonly');
        $('#somebuttons').hide();

      else
        $('#snapshot-address').hide();

    else
      alert("nono")

  undoHideForm = ->
    $('#snapshot-address').show();
    console.log("ha ha!")
