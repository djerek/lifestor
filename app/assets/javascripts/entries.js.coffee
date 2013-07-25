
jQuery ->
  $('#entry_written_on').datepicker
    dateFormat: 'D, M d, yy'
    maxDate: 0
    setDate: new Date()

  $('#entry_location_tokens').tokenInput '/locations.json',
    theme: 'facebook',
    propertyToSearch: "title",
    prePopulate: $('#loc-token').data('locationtokens')
