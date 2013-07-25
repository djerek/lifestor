# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  $('#entry_location_tokens').tokenInput '/locations.json',
    theme: 'facebook',
    propertyToSearch: "title",
    prePopulate: $('#loc-token').data('locationtokens')
    